import { writeFile, mkdir, unlink } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { createHash } from 'crypto'

export class FileUploadService {
  private static readonly UPLOAD_DIR = join(process.cwd(), 'uploads', 'pod')
  private static readonly MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
  private static readonly ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]

  static async uploadFile(file: File, orderId: string): Promise<{
    fileName: string
    filePath: string
    fileUrl: string
    fileSize: number
    mimeType: string
    checksum: string
  }> {
    // 验证文件
    this.validateFile(file)

    // 创建上传目录
    const orderDir = join(this.UPLOAD_DIR, orderId)
    await this.ensureDirectoryExists(orderDir)

    // 生成文件名
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 8)
    const extension = this.getFileExtension(file.name)
    const fileName = `${timestamp}_${random}${extension}`
    const filePath = join(orderDir, fileName)

    // 读取文件内容
    const buffer = Buffer.from(await file.arrayBuffer())

    // 计算文件校验和
    const checksum = createHash('md5').update(buffer).digest('hex')

    // 保存文件
    await writeFile(filePath, buffer)

    // 生成文件URL
    const fileUrl = `/api/tms/pod/files/${orderId}/${fileName}`

    return {
      fileName,
      filePath,
      fileUrl,
      fileSize: file.size,
      mimeType: file.type,
      checksum
    }
  }

  static async deleteFile(filePath: string): Promise<void> {
    try {
      if (existsSync(filePath)) {
        await unlink(filePath)
      }
    } catch (error) {
      console.error('删除文件失败:', error)
      throw new Error('删除文件失败')
    }
  }

  static async getFileUrl(orderId: string, fileName: string): Promise<string> {
    return `/api/tms/pod/files/${orderId}/${fileName}`
  }

  private static validateFile(file: File): void {
    if (file.size > this.MAX_FILE_SIZE) {
      throw new Error(`文件大小不能超过 ${this.MAX_FILE_SIZE / (1024 * 1024)}MB`)
    }

    if (!this.ALLOWED_MIME_TYPES.includes(file.type)) {
      throw new Error('不支持的文件类型')
    }
  }

  private static async ensureDirectoryExists(dirPath: string): Promise<void> {
    if (!existsSync(dirPath)) {
      await mkdir(dirPath, { recursive: true })
    }
  }

  private static getFileExtension(filename: string): string {
    const ext = filename.split('.').pop()
    return ext ? `.${ext.toLowerCase()}` : ''
  }
}