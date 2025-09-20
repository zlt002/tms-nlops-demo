# TMS NL-Ops API文档和测试系统

## 概述

TMS NL-Ops演示系统提供了完整的API文档生成和测试解决方案，支持自动化测试、性能监控和交互式文档浏览。

## 功能特性

### 📚 API文档生成
- **OpenAPI 3.0规范**: 生成标准的OpenAPI规范文档
- **Swagger UI**: 提供交互式API测试界面
- **自动扫描**: 自动扫描API路由生成文档
- **多格式输出**: 支持JSON、Markdown、Postman集合等多种格式

### 🧪 测试系统
- **单元测试**: Jest测试框架，支持TypeScript
- **集成测试**: API端到端测试
- **性能测试**: 负载测试和压力测试
- **覆盖率报告**: 详细的测试覆盖率分析

### 📊 监控和统计
- **健康检查**: 实时系统健康状态监控
- **性能统计**: API响应时间和吞吐量统计
- **使用统计**: 业务数据统计和分析
- **监控仪表板**: 可视化监控界面

## 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 设置环境变量
```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑环境变量
vim .env.local
```

### 3. 初始化数据库
```bash
# 生成Prisma客户端
npm run db:generate

# 运行数据库迁移
npm run db:migrate

# 填充测试数据
npm run db:seed
```

### 4. 启动开发服务器
```bash
npm run dev
```

### 5. 访问API文档
打开浏览器访问: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## API文档

### 生成文档
```bash
# 生成完整API文档
npm run generate:docs

# 本地预览文档
npm run docs:serve
```

### 文档结构
```
public/api-docs/
├── openapi.json          # OpenAPI规范
├── postman-collection.json # Postman集合
├── API_DOCS.md           # Markdown文档
└── README.md             # 使用说明
```

### Swagger UI特性
- 交互式API测试
- 实时请求/响应查看
- 认证配置
- 代码示例生成
- 模式验证

## 测试系统

### 运行测试
```bash
# 运行所有测试
npm test

# 运行单元测试
npm run test:unit

# 运行API集成测试
npm run test:api

# 运行性能测试
npm run test:performance

# 生成覆盖率报告
npm run test:coverage
```

### 测试类型
1. **单元测试**: 测试单个函数和组件
2. **集成测试**: 测试API端点完整流程
3. **端到端测试**: 模拟真实用户操作
4. **性能测试**: 负载和压力测试

### 测试配置
测试配置文件:
- `jest.config.js` - Jest配置
- `__tests__/setup.ts` - 测试环境设置
- `tests/performance/` - 性能测试配置

## 性能测试

### 负载测试
```bash
# 运行负载测试
npm run performance:load

# 运行压力测试
npm run performance:stress
```

### 性能指标
- **响应时间**: P50, P95, P99百分位
- **吞吐量**: 每秒请求数(RPS)
- **错误率**: 请求失败比例
- **资源使用**: CPU、内存、网络使用情况

### 性能报告
性能测试报告生成在: `tests/performance/performance-report.json`

## 监控系统

### 健康检查
```bash
# 检查系统健康状态
curl http://localhost:3000/api/health

# 检查服务存活状态
curl http://localhost:3000/api/health/live

# 检查服务就绪状态
curl http://localhost:3000/api/health/ready
```

### 统计接口
```bash
# 获取系统统计信息
curl -H "Authorization: Bearer <token>" \
     http://localhost:3000/api/stats?period=7d
```

### 监控仪表板
访问监控仪表板: [http://localhost:3000/dashboard/api](http://localhost:3000/dashboard/api)

## 代码示例

### JavaScript/Node.js
```javascript
const response = await fetch('/api/orders', {
  headers: {
    'Authorization': 'Bearer your-token',
    'Content-Type': 'application/json'
  }
});
const data = await response.json();
```

### Python
```python
import requests

response = requests.get(
    'http://localhost:3000/api/orders',
    headers={
        'Authorization': 'Bearer your-token',
        'Content-Type': 'application/json'
    }
)
data = response.json()
```

### cURL
```bash
curl -X GET "http://localhost:3000/api/orders" \
     -H "Authorization: Bearer your-token" \
     -H "Content-Type: application/json"
```

## CI/CD集成

### GitHub Actions
项目包含完整的CI/CD流水线配置:

- **.github/workflows/api-tests.yml** - 自动化测试和部署
- **docker-compose.test.yml** - Docker测试环境
- **package.json** - 测试脚本配置

### 自动化流程
1. 代码提交 → 触发CI/CD
2. 运行单元测试和集成测试
3. 生成API文档
4. 运行性能测试
5. 部署到GitHub Pages

### 质量检查
- ESLint代码检查
- TypeScript类型检查
- 安全漏洞扫描
- 测试覆盖率报告

## 部署指南

### 开发环境部署
```bash
# 1. 克隆项目
git clone <repository-url>
cd tms-nlops-demo

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env.local
# 编辑.env.local配置数据库等信息

# 4. 初始化数据库
npm run db:migrate
npm run db:seed

# 5. 启动开发服务器
npm run dev
```

### 生产环境部署

#### Docker部署
```bash
# 构建镜像
docker build -t tms-nlops-demo .

# 运行容器
docker run -p 3000:3000 \
  -e DATABASE_URL="your-database-url" \
  -e NODE_ENV="production" \
  tms-nlops-demo
```

#### Docker Compose部署
```bash
# 使用生产环境配置
docker-compose -f docker-compose.prod.yml up -d
```

#### Vercel部署
1. 连接GitHub仓库到Vercel
2. 配置环境变量
3. 自动部署

### 环境变量配置
```bash
# 必需的环境变量
DATABASE_URL=postgresql://user:password@localhost:5432/tms
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production

# 可选的环境变量
REDIS_URL=redis://localhost:6379
LOG_LEVEL=info
API_RATE_LIMIT=100
```

## 最佳实践

### API设计
- 使用RESTful设计原则
- 统一的响应格式
- 完善的错误处理
- 合理的HTTP状态码

### 测试策略
- 测试覆盖率 > 80%
- 每个API端点都有对应测试
- 包含正常和异常情况测试
- 定期运行性能测试

### 文档维护
- 代码变更时同步更新文档
- 保持文档与实现一致
- 提供完整的示例代码
- 定期验证API规范

### 性能优化
- 实施缓存策略
- 数据库查询优化
- 限流和熔断机制
- 监控和告警

## 故障排除

### 常见问题

#### 1. 数据库连接失败
```bash
# 检查数据库服务状态
npm run db:studio

# 验证数据库连接字符串
echo $DATABASE_URL
```

#### 2. 测试失败
```bash
# 清理测试数据库
npm run db:reset

# 重新运行测试
npm test
```

#### 3. API文档生成失败
```bash
# 检查TypeScript编译
npm run type-check

# 重新生成文档
npm run generate:docs
```

### 日志查看
```bash
# 查看应用日志
npm run dev

# 查看测试日志
npm run test -- --verbose

# 查看性能测试日志
npm run test:performance
```

## 贡献指南

### 开发流程
1. Fork项目
2. 创建功能分支
3. 编写代码和测试
4. 生成文档
5. 提交Pull Request

### 提交规范
```bash
# 使用commitizen提交
npm run commit

# 提交格式
type(scope): description

# 示例
feat(api): add new order endpoint
fix(auth): resolve token validation issue
docs(readme): update deployment guide
```

## 支持和联系

- **问题反馈**: GitHub Issues
- **功能请求**: GitHub Discussions
- **文档问题**: 提交PR修复
- **紧急问题**: 联系维护者

## 许可证

本项目采用MIT许可证，详见[LICENSE](LICENSE)文件。

---

**最后更新**: 2024年1月
**版本**: 1.0.0