import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { batchLocationUpdateSchema } from '@/lib/validators/tracking'
import { TrackingService } from '@/services/trackingService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = batchLocationUpdateSchema.parse(body)

    // 检查运单是否存在
    const shipment = await prisma.shipment.findUnique({
      where: { id: validatedData.shipmentId },
      include: {
        vehicle: true,
        driver: true,
        route: true
      }
    })

    if (!shipment) {
      return NextResponse.json(
        { error: '运单不存在' },
        { status: 404 }
      )
    }

    // 验证运单状态
    if (shipment.status !== 'IN_TRANSIT' && shipment.status !== 'LOADING' && shipment.status !== 'UNLOADING') {
      return NextResponse.json(
        { error: '运单不在运输状态，无法批量更新位置' },
        { status: 400 }
      )
    }

    // 验证位置数据数量
    if (validatedData.updates.length > 1000) {
      return NextResponse.json(
        { error: '批量更新最多支持1000条位置数据' },
        { status: 400 }
      )
    }

    // 数据预处理和验证
    const processedUpdates = await preprocessLocationUpdates(validatedData.updates)

    // 执行批量位置更新
    const result = await TrackingService.batchLocationUpdates(
      validatedData.shipmentId,
      processedUpdates,
      validatedData.deviceId
    )

    // 如果有错误，记录详细信息
    if (result.errors.length > 0) {
      console.warn(`批量位置更新完成，但有 ${result.errors.length} 个错误`)
      result.errors.forEach((error, index) => {
        console.warn(`错误 ${index + 1}:`, error)
      })
    }

    // 生成批量更新统计信息
    const batchStats = await generateBatchStatistics(validatedData.shipmentId, processedUpdates)

    // 检查批量更新中的异常情况
    if (result.successful > 0) {
      await checkBatchAnomalies(shipment, processedUpdates)
    }

    return NextResponse.json({
      success: true,
      data: {
        ...result,
        statistics: batchStats,
        processingTime: Date.now()
      },
      message: `批量位置更新完成，成功 ${result.successful} 条，失败 ${result.failed} 条`
    })

  } catch (error) {
    console.error('批量位置更新失败:', error)
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: '数据验证失败', details: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: '批量位置更新失败', details: error instanceof Error ? error.message : '未知错误' },
      { status: 500 }
    )
  }
}

// 辅助函数：预处理位置更新数据
async function preprocessLocationUpdates(updates: any[]) {
  return updates.map((update, index) => {
    // 确保时间戳是递增的
    if (update.timestamp) {
      const timestamp = new Date(update.timestamp)
      if (isNaN(timestamp.getTime())) {
        console.warn(`位置数据 ${index} 时间戳无效，使用当前时间`)
        update.timestamp = new Date()
      } else {
        update.timestamp = timestamp
      }
    } else {
      update.timestamp = new Date()
    }

    // 验证坐标范围
    if (update.latitude < -90 || update.latitude > 90) {
      console.warn(`位置数据 ${index} 纬度超出范围: ${update.latitude}`)
      update.latitude = Math.max(-90, Math.min(90, update.latitude))
    }

    if (update.longitude < -180 || update.longitude > 180) {
      console.warn(`位置数据 ${index} 经度超出范围: ${update.longitude}`)
      update.longitude = Math.max(-180, Math.min(180, update.longitude))
    }

    // 验证速度范围
    if (update.speed !== undefined) {
      update.speed = Math.max(0, Math.min(300, update.speed))
    } else {
      update.speed = 0
    }

    // 验证方向范围
    if (update.heading !== undefined) {
      update.heading = update.heading % 360
      if (update.heading < 0) update.heading += 360
    } else {
      update.heading = 0
    }

    return update
  })
}

// 辅助函数：生成批量更新统计信息
async function generateBatchStatistics(shipmentId: string, updates: any[]) {
  if (updates.length === 0) {
    return {
      totalUpdates: 0,
      timeSpan: 0,
      distanceCovered: 0,
      avgSpeed: 0,
      maxSpeed: 0,
      altitudeRange: { min: 0, max: 0 },
      accuracyStats: { avg: 0, best: 0, worst: 0 }
    }
  }

  // 按时间排序
  const sortedUpdates = [...updates].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

  // 计算时间跨度
  const startTime = new Date(sortedUpdates[0].timestamp)
  const endTime = new Date(sortedUpdates[sortedUpdates.length - 1].timestamp)
  const timeSpan = (endTime.getTime() - startTime.getTime()) / (1000 * 60) // 分钟

  // 计算距离和速度统计
  let totalDistance = 0
  let maxSpeed = 0
  let speedSum = 0
  let validSpeedCount = 0
  let minAltitude = Infinity
  let maxAltitude = -Infinity
  let accuracySum = 0
  let validAccuracyCount = 0
  let bestAccuracy = Infinity
  let worstAccuracy = 0

  for (let i = 1; i < sortedUpdates.length; i++) {
    const prev = sortedUpdates[i - 1]
    const curr = sortedUpdates[i]

    // 计算距离
    const distance = await TrackingService['calculateDistance'](
      prev.latitude, prev.longitude,
      curr.latitude, curr.longitude
    )
    totalDistance += distance

    // 速度统计
    if (curr.speed !== undefined && curr.speed > 0) {
      speedSum += curr.speed
      validSpeedCount++
      maxSpeed = Math.max(maxSpeed, curr.speed)
    }

    // 海拔统计
    if (curr.altitude !== undefined) {
      minAltitude = Math.min(minAltitude, curr.altitude)
      maxAltitude = Math.max(maxAltitude, curr.altitude)
    }

    // 精度统计
    if (curr.accuracy !== undefined && curr.accuracy > 0) {
      accuracySum += curr.accuracy
      validAccuracyCount++
      bestAccuracy = Math.min(bestAccuracy, curr.accuracy)
      worstAccuracy = Math.max(worstAccuracy, curr.accuracy)
    }
  }

  return {
    totalUpdates: updates.length,
    timeSpan: Math.round(timeSpan * 100) / 100,
    distanceCovered: Math.round(totalDistance * 100) / 100,
    avgSpeed: validSpeedCount > 0 ? Math.round((speedSum / validSpeedCount) * 100) / 100 : 0,
    maxSpeed: Math.round(maxSpeed * 100) / 100,
    altitudeRange: {
      min: minAltitude === Infinity ? 0 : Math.round(minAltitude * 100) / 100,
      max: maxAltitude === -Infinity ? 0 : Math.round(maxAltitude * 100) / 100
    },
    accuracyStats: {
      avg: validAccuracyCount > 0 ? Math.round((accuracySum / validAccuracyCount) * 100) / 100 : 0,
      best: bestAccuracy === Infinity ? 0 : Math.round(bestAccuracy * 100) / 100,
      worst: Math.round(worstAccuracy * 100) / 100
    }
  }
}

// 辅助函数：检查批量更新中的异常情况
async function checkBatchAnomalies(shipment: any, updates: any[]) {
  const anomalies = []

  // 检查时间间隔异常
  for (let i = 1; i < updates.length; i++) {
    const prev = updates[i - 1]
    const curr = updates[i]

    const timeDiff = new Date(curr.timestamp).getTime() - new Date(prev.timestamp).getTime()
    const minutesDiff = timeDiff / (1000 * 60)

    // 检查长时间间隔（超过30分钟）
    if (minutesDiff > 30) {
      anomalies.push({
        type: 'TIME_GAP',
        severity: 'MEDIUM',
        description: `位置数据间隔 ${Math.round(minutesDiff)} 分钟，可能存在数据丢失`,
        location: { lat: curr.latitude, lng: curr.longitude },
        timestamp: curr.timestamp
      })
    }

    // 检查极短时间间隔（小于1秒）
    if (minutesDiff < 1/60) {
      anomalies.push({
        type: 'TIME_OVERLAP',
        severity: 'LOW',
        description: '位置数据时间间隔过短，可能存在重复数据',
        location: { lat: curr.latitude, lng: curr.longitude },
        timestamp: curr.timestamp
      })
    }
  }

  // 检查速度异常
  for (let i = 1; i < updates.length; i++) {
    const prev = updates[i - 1]
    const curr = updates[i]

    if (curr.speed !== undefined && curr.speed > 150) {
      anomalies.push({
        type: 'SPEED_ANOMALY',
        severity: 'HIGH',
        description: `检测到异常高速: ${curr.speed} km/h`,
        location: { lat: curr.latitude, lng: curr.longitude },
        timestamp: curr.timestamp
      })
    }

    // 检查加速度异常
    if (prev.speed !== undefined && curr.speed !== undefined) {
      const timeDiff = (new Date(curr.timestamp).getTime() - new Date(prev.timestamp).getTime()) / 1000 // 秒
      if (timeDiff > 0) {
        const acceleration = (curr.speed - prev.speed) / timeDiff * 3.6 // 转换为 km/h/s

        if (Math.abs(acceleration) > 10) { // 超过10km/h/s的加速度
          anomalies.push({
            type: 'ACCELERATION_ANOMALY',
            severity: 'HIGH',
            description: `检测到异常加速度: ${Math.round(acceleration * 100) / 100} km/h/s`,
            location: { lat: curr.latitude, lng: curr.longitude },
            timestamp: curr.timestamp
          })
        }
      }
    }
  }

  // 检查位置跳跃异常
  for (let i = 1; i < updates.length; i++) {
    const prev = updates[i - 1]
    const curr = updates[i]

    const distance = await TrackingService['calculateDistance'](
      prev.latitude, prev.longitude,
      curr.latitude, curr.longitude
    )

    const timeDiff = (new Date(curr.timestamp).getTime() - new Date(prev.timestamp).getTime()) / (1000 * 60) // 分钟

    if (timeDiff > 0) {
      const avgSpeed = distance / (timeDiff / 60) // km/h

      if (avgSpeed > 200) { // 超过200km/h的平均速度
        anomalies.push({
          type: 'POSITION_JUMP',
          severity: 'HIGH',
          description: `检测到位置跳跃异常，平均速度: ${Math.round(avgSpeed * 100) / 100} km/h`,
          location: { lat: curr.latitude, lng: curr.longitude },
          timestamp: curr.timestamp
        })
      }
    }
  }

  // 创建异常警报
  for (const anomaly of anomalies) {
    try {
      await prisma.trackingAlert.create({
        data: {
          shipmentId: shipment.id,
          alertType: 'DATA_ANOMALY',
          severity: anomaly.severity,
          title: '批量更新数据异常',
          description: anomaly.description,
          location: JSON.stringify(anomaly.location),
          status: 'ACTIVE'
        }
      })
    } catch (error) {
      console.error('创建异常警报失败:', error)
    }
  }

  return anomalies
}