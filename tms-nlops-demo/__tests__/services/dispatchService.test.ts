import { DispatchService } from '@/services/dispatchService'
import { prisma } from '@/lib/db/prisma'

// Mock prisma
jest.mock('@/lib/db/prisma')

describe('DispatchService', () => {
  const mockOrders = [
    {
      id: 'order1',
      orderNumber: 'ORD001',
      customerId: 'customer1',
      cargoName: '测试货物',
      cargoWeight: 10,
      cargoVolume: 20,
      cargoValue: 5000,
      originAddress: '北京市朝阳区',
      destinationAddress: '上海市浦东新区',
      expectedTime: new Date('2024-01-15T10:00:00Z'),
      status: 'CONFIRMED'
    }
  ]

  const mockVehicles = [
    {
      id: 'vehicle1',
      licensePlate: '京A12345',
      type: 'TRUCK',
      maxLoad: 20,
      maxVolume: 40,
      status: 'AVAILABLE',
      fuelLevel: 80,
      dailyRate: 500,
      isActive: true
    }
  ]

  const mockDrivers = [
    {
      id: 'driver1',
      name: '张三',
      phone: '13800138001',
      licenseNumber: 'D123456',
      status: 'AVAILABLE',
      isActive: true,
      rating: 4.5,
      drivingYears: 5,
      accidentCount: 0,
      violationCount: 0
    }
  ]

  const mockCustomers = [
    {
      id: 'customer1',
      customerNumber: 'CUST001',
      companyName: '测试客户公司',
      email: 'test@example.com',
      phone: '13800138000'
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createDispatch', () => {
    const createDispatchData = {
      orderIds: ['order1'],
      vehicleId: 'vehicle1',
      driverId: 'driver1',
      plannedDeparture: new Date('2024-01-15T10:00:00Z'),
      originAddress: '北京市朝阳区',
      destinationAddress: '上海市浦东新区',
      totalWeight: 10,
      totalVolume: 20,
      totalValue: 5000,
      instructions: '测试说明'
    }

    it('应该成功创建发车单', async () => {
      // Mock prisma calls
      ;(prisma.order.findMany as jest.Mock).mockResolvedValue(mockOrders)
      ;(prisma.vehicle.findUnique as jest.Mock).mockResolvedValue(mockVehicles[0])
      ;(prisma.driver.findUnique as jest.Mock).mockResolvedValue(mockDrivers[0])
      ;(prisma.dispatch.create as jest.Mock).mockResolvedValue({
        id: 'dispatch1',
        dispatchNumber: 'DISP20240115001',
        ...createDispatchData
      })
      ;(prisma.shipment.create as jest.Mock).mockResolvedValue({
        id: 'shipment1',
        shipmentNumber: 'SHP20240115001'
      })
      ;(prisma.order.updateMany as jest.Mock).mockResolvedValue({ count: 1 })
      ;(prisma.vehicle.update as jest.Mock).mockResolvedValue({})
      ;(prisma.driver.update as jest.Mock).mockResolvedValue({})

      // Mock utility methods
      jest.spyOn(DispatchService as any, 'calculateDistance').mockResolvedValue(100)
      jest.spyOn(DispatchService as any, 'calculateBaseRate').mockResolvedValue(200)
      jest.spyOn(DispatchService as any, 'calculateFuelSurcharge').mockReturnValue(50)
      jest.spyOn(DispatchService as any, 'estimateTollFees').mockResolvedValue(30)
      jest.spyOn(DispatchService as any, 'generateDispatchNumber').mockResolvedValue('DISP20240115001')
      jest.spyOn(DispatchService as any, 'generateShipmentNumber').mockResolvedValue('SHP20240115001')

      const result = await DispatchService.createDispatch(createDispatchData)

      expect(result).toBeDefined()
      expect(result.dispatch).toBeDefined()
      expect(result.shipments).toBeDefined()

      // Verify prisma calls
      expect(prisma.order.findMany).toHaveBeenCalledWith({
        where: { id: { in: ['order1'] } }
      })
      expect(prisma.vehicle.findUnique).toHaveBeenCalledWith({
        where: { id: 'vehicle1' }
      })
      expect(prisma.driver.findUnique).toHaveBeenCalledWith({
        where: { id: 'driver1' }
      })
      expect(prisma.dispatch.create).toHaveBeenCalled()
      expect(prisma.shipment.create).toHaveBeenCalled()
    })

    it('应该验证订单状态', async () => {
      const invalidOrders = [
        { ...mockOrders[0], status: 'PENDING' }
      ]
      ;(prisma.order.findMany as jest.Mock).mockResolvedValue(invalidOrders)

      await expect(DispatchService.createDispatch(createDispatchData))
        .rejects.toThrow('只能调度已确认的订单')
    })

    it('应该验证车辆可用性', async () => {
      ;(prisma.order.findMany as jest.Mock).mockResolvedValue(mockOrders)
      ;(prisma.vehicle.findUnique as jest.Mock).mockResolvedValue({
        ...mockVehicles[0],
        status: 'IN_TRANSIT'
      })

      await expect(DispatchService.createDispatch(createDispatchData))
        .rejects.toThrow('车辆不可用')
    })

    it('应该验证车辆容量', async () => {
      const overloadedData = {
        ...createDispatchData,
        totalWeight: 30 // 超过车辆载重20
      }

      ;(prisma.order.findMany as jest.Mock).mockResolvedValue(mockOrders)
      ;(prisma.vehicle.findUnique as jest.Mock).mockResolvedValue(mockVehicles[0])
      ;(prisma.driver.findUnique as jest.Mock).mockResolvedValue(mockDrivers[0])

      await expect(DispatchService.createDispatch(overloadedData))
        .rejects.toThrow('货物总重量超过车辆载重')
    })

    it('应该验证司机可用性', async () => {
      ;(prisma.order.findMany as jest.Mock).mockResolvedValue(mockOrders)
      ;(prisma.vehicle.findUnique as jest.Mock).mockResolvedValue(mockVehicles[0])
      ;(prisma.driver.findUnique as jest.Mock).mockResolvedValue({
        ...mockDrivers[0],
        status: 'ON_DUTY'
      })

      await expect(DispatchService.createDispatch(createDispatchData))
        .rejects.toThrow('司机不可用')
    })

    it('应该计算总货物信息', async () => {
      const multiOrderData = {
        ...createDispatchData,
        orderIds: ['order1', 'order2'],
        totalWeight: undefined, // 应该从订单计算
        totalVolume: undefined
      }

      const multipleOrders = [
        mockOrders[0],
        { ...mockOrders[0], id: 'order2', cargoWeight: 15, cargoVolume: 30, cargoValue: 8000 }
      ]

      ;(prisma.order.findMany as jest.Mock).mockResolvedValue(multipleOrders)
      ;(prisma.vehicle.findUnique as jest.Mock).mockResolvedValue(mockVehicles[0])
      ;(prisma.driver.findUnique as jest.Mock).mockResolvedValue(mockDrivers[0])
      ;(prisma.dispatch.create as jest.Mock).mockResolvedValue({ id: 'dispatch1' })
      ;(prisma.shipment.create as jest.Mock).mockResolvedValue({ id: 'shipment1' })
      ;(prisma.order.updateMany as jest.Mock).mockResolvedValue({ count: 2 })
      ;(prisma.vehicle.update as jest.Mock).mockResolvedValue({})
      ;(prisma.driver.update as jest.Mock).mockResolvedValue({})

      jest.spyOn(DispatchService as any, 'calculateDistance').mockResolvedValue(100)
      jest.spyOn(DispatchService as any, 'calculateBaseRate').mockResolvedValue(200)
      jest.spyOn(DispatchService as any, 'calculateFuelSurcharge').mockReturnValue(50)
      jest.spyOn(DispatchService as any, 'estimateTollFees').mockResolvedValue(30)
      jest.spyOn(DispatchService as any, 'generateDispatchNumber').mockResolvedValue('DISP20240115001')
      jest.spyOn(DispatchService as any, 'generateShipmentNumber').mockResolvedValue('SHP20240115001')

      await DispatchService.createDispatch(multiOrderData)

      // 验证dispatch.create被调用时使用了正确的总重量和体积
      const dispatchCreateCall = (prisma.dispatch.create as jest.Mock).mock.calls[0][0]
      expect(dispatchCreateCall.data.totalWeight).toBe(25) // 10 + 15
      expect(dispatchCreateCall.data.totalVolume).toBe(50) // 20 + 30
      expect(dispatchCreateCall.data.totalValue).toBe(13000) // 5000 + 8000
    })
  })

  describe('updateDispatchStatus', () => {
    const mockDispatch = {
      id: 'dispatch1',
      status: 'SCHEDULED',
      vehicleId: 'vehicle1',
      driverId: 'driver1',
      shipments: [
        { orderId: 'order1' }
      ]
    }

    it('应该成功更新发车单状态', async () => {
      ;(prisma.dispatch.findUnique as jest.Mock).mockResolvedValue(mockDispatch)
      ;(prisma.dispatch.update as jest.Mock).mockResolvedValue({
        ...mockDispatch,
        status: 'IN_TRANSIT',
        actualDeparture: new Date()
      })
      ;(prisma.vehicle.update as jest.Mock).mockResolvedValue({})
      ;(prisma.driver.update as jest.Mock).mockResolvedValue({})

      const result = await DispatchService.updateDispatchStatus(
        'dispatch1',
        'IN_TRANSIT'
      )

      expect(result.status).toBe('IN_TRANSIT')
      expect(prisma.dispatch.update).toHaveBeenCalled()
    })

    it('应该验证状态转换的有效性', async () => {
      ;(prisma.dispatch.findUnique as jest.Mock).mockResolvedValue(mockDispatch)

      await expect(
        DispatchService.updateDispatchStatus('dispatch1', 'COMPLETED')
      ).rejects.toThrow('无法从 SCHEDULED 转换到 COMPLETED')
    })

    it('应该处理不存在的发车单', async () => {
      ;(prisma.dispatch.findUnique as jest.Mock).mockResolvedValue(null)

      await expect(
        DispatchService.updateDispatchStatus('nonexistent', 'IN_TRANSIT')
      ).rejects.toThrow('发车单不存在')
    })

    it('应该更新相关资源状态', async () => {
      ;(prisma.dispatch.findUnique as jest.Mock).mockResolvedValue(mockDispatch)
      ;(prisma.dispatch.update as jest.Mock).mockResolvedValue({
        ...mockDispatch,
        status: 'COMPLETED',
        actualArrival: new Date(),
        completedAt: new Date()
      })
      ;(prisma.vehicle.update as jest.Mock).mockResolvedValue({})
      ;(prisma.driver.update as jest.Mock).mockResolvedValue({})

      await DispatchService.updateDispatchStatus('dispatch1', 'COMPLETED')

      expect(prisma.vehicle.update).toHaveBeenCalledWith({
        where: { id: 'vehicle1' },
        data: { status: 'AVAILABLE', updatedBy: 'system' }
      })
      expect(prisma.driver.update).toHaveBeenCalledWith({
        where: { id: 'driver1' },
        data: { status: 'ON_DUTY', updatedBy: 'system' }
      })
    })
  })

  describe('getPendingOrders', () => {
    it('应该获取待调度订单', async () => {
      const pendingOrders = [
        {
          ...mockOrders[0],
          customer: mockCustomers[0]
        }
      ]

      ;(prisma.order.findMany as jest.Mock).mockResolvedValue(pendingOrders)

      const result = await DispatchService.getPendingOrders()

      expect(result).toEqual(pendingOrders)
      expect(prisma.order.findMany).toHaveBeenCalledWith({
        where: {
          status: 'CONFIRMED',
          shipments: {
            none: {}
          }
        },
        include: {
          customer: {
            select: {
              id: true,
              customerNumber: true,
              companyName: true,
              email: true,
              phone: true
            }
          }
        },
        orderBy: {
          expectedTime: 'asc',
          priority: 'desc'
        }
      })
    })
  })

  describe('getAvailableVehicles', () => {
    it('应该获取可用车辆', async () => {
      const vehiclesWithDrivers = [
        {
          ...mockVehicles[0],
          drivers: [mockDrivers[0]]
        }
      ]

      ;(prisma.vehicle.findMany as jest.Mock).mockResolvedValue(vehiclesWithDrivers)

      const result = await DispatchService.getAvailableVehicles()

      expect(result).toEqual(vehiclesWithDrivers)
      expect(prisma.vehicle.findMany).toHaveBeenCalledWith({
        where: {
          status: 'AVAILABLE',
          isActive: true
        },
        include: {
          drivers: {
            where: {
              status: 'AVAILABLE',
              isActive: true
            }
          }
        }
      })
    })

    it('应该过滤掉没有司机的车辆', async () => {
      const vehiclesWithoutDrivers = [
        {
          ...mockVehicles[0],
          drivers: []
        }
      ]

      ;(prisma.vehicle.findMany as jest.Mock).mockResolvedValue(vehiclesWithoutDrivers)

      const result = await DispatchService.getAvailableVehicles()

      expect(result).toEqual([])
    })
  })

  describe('getDispatchStatistics', () => {
    it('应该获取统计数据', async () => {
      const mockStatistics = {
        totalDispatches: 10,
        completedDispatches: 8,
        inTransitDispatches: 2,
        completionRate: 80,
        totalShipments: 15,
        avgShipmentsPerDispatch: 1.5,
        avgDispatchDuration: 24,
        topVehicles: [{ vehicleId: 'vehicle1', _count: 5 }],
        topDrivers: [{ driverId: 'driver1', _count: 6 }]
      }

      ;(prisma.dispatch.count as jest.Mock).mockResolvedValue(10)
      ;(prisma.dispatch.count as jest.Mock).mockResolvedValue(8)
      ;(prisma.dispatch.count as jest.Mock).mockResolvedValue(2)
      ;(prisma.shipment.count as jest.Mock).mockResolvedValue(15)
      ;(prisma.dispatch.aggregate as jest.Mock).mockResolvedValue({
        _avg: { estimatedDuration: 24 }
      })
      ;(prisma.dispatch.groupBy as jest.Mock)
        .mockResolvedValueOnce([{ vehicleId: 'vehicle1', _count: 5 }])
        .mockResolvedValueOnce([{ driverId: 'driver1', _count: 6 }])

      const dateRange = {
        start: new Date('2024-01-01'),
        end: new Date('2024-01-31')
      }

      const result = await DispatchService.getDispatchStatistics(dateRange)

      expect(result).toEqual(mockStatistics)
      expect(prisma.dispatch.count).toHaveBeenCalledTimes(3)
    })
  })

  describe('optimizeRoute', () => {
    const optimizeRequest = {
      orderIds: ['order1', 'order2'],
      vehicleId: 'vehicle1',
      preferences: { prioritizeDistance: true }
    }

    it('应该成功优化路线', async () => {
      ;(prisma.order.findUnique as jest.Mock)
        .mockResolvedValueOnce(mockOrders[0])
        .mockResolvedValueOnce(mockOrders[0])
      ;(prisma.vehicle.findUnique as jest.Mock).mockResolvedValue({
        ...mockVehicles[0],
        driver: mockDrivers[0]
      })

      jest.spyOn(DispatchService as any, 'calculateOptimalRoute').mockReturnValue([])
      jest.spyOn(DispatchService as any, 'calculateTotalDistance').mockReturnValue(150)
      jest.spyOn(DispatchService as any, 'calculateEstimatedDuration').mockReturnValue(180)

      const result = await DispatchService.optimizeRoute(optimizeRequest)

      expect(result).toEqual({
        waypoints: [],
        totalDistance: 150,
        estimatedDuration: 180,
        totalWeight: 20,
        totalVolume: 40
      })
    })

    it('应该验证订单和车辆存在', async () => {
      ;(prisma.order.findUnique as jest.Mock).mockResolvedValue(null)

      await expect(DispatchService.optimizeRoute(optimizeRequest))
        .rejects.toThrow('订单或车辆不存在')
    })

    it('应该验证车辆容量', async () => {
      const heavyOrder = { ...mockOrders[0], cargoWeight: 30 }
      ;(prisma.order.findUnique as jest.Mock)
        .mockResolvedValueOnce(heavyOrder)
        .mockResolvedValueOnce(mockOrders[0])
      ;(prisma.vehicle.findUnique as jest.Mock).mockResolvedValue({
        ...mockVehicles[0],
        driver: mockDrivers[0]
      })

      await expect(DispatchService.optimizeRoute(optimizeRequest))
        .rejects.toThrow('货物总重量超过车辆载重')
    })
  })
})