# GitHub Sub-Issues 映射表

**父Epic Issue:** #1
**创建时间:** 2025年09月20日 13:47:07
**总计创建:** 40个sub-issues

## 文件到Issue编号映射

| 任务文件 | Issue编号 | 标题 |
|---------|-----------|------|
| 003.md | #16 | TMS NL-Ops演示系统任务003: PostgreSQL数据库连接配置和Prisma初始化 |
| 004.md | #17 | TMS NL-Ops演示系统任务004: 数据库Schema设计 (订单、客户、车辆、排车、跟踪、回单等实体) |
| 005.md | #18 | TMS NL-Ops演示系统任务005: 核心依赖包安装和配置验证 |
| 006.md | #19 | TMS NL-Ops演示系统任务006: 开发环境配置 (ESLint, Prettier, Git hooks) |
| 007.md | #20 | TMS NL-Ops演示系统任务007: 基础API路由结构搭建 |
| 008.md | #21 | TMS NL-Ops演示系统任务008: 订单管理API实现 |
| 009.md | #22 | TMS NL-Ops演示系统任务009: 客户管理API实现 |
| 010.md | #23 | TMS NL-Ops演示系统任务010: 车辆管理API实现 |
| 011.md | #24 | TMS NL-Ops演示系统任务011: 排车调度API实现 |
| 012.md | #25 | TMS NL-Ops演示系统任务012: 在途跟踪API实现 |
| 013.md | #26 | TMS NL-Ops演示系统任务013: 回单管理API实现 |
| 014.md | #27 | TMS NL-Ops演示系统任务014: API数据验证和错误处理中间件 |
| 015.md | #28 | TMS NL-Ops演示系统任务015: API文档生成和测试 |
| 016.md | #29 | TMS NL-Ops演示系统任务016: 订单管理界面实现 |
| 017.md | #30 | TMS NL-Ops演示系统任务017: 排车调度界面实现 |
| 018.md | #31 | TMS NL-Ops演示系统任务018: 在途跟踪界面实现 |
| 019.md | #32 | TMS NL-Ops演示系统任务019: 回单管理界面实现 |
| 020.md | #33 | TMS NL-Ops演示系统任务020: 仪表板和统计页面实现 |
| 021.md | #34 | TMS NL-Ops演示系统任务021: 传统UI路由和导航设计 |
| 022.md | #35 | TMS NL-Ops演示系统任务022: 响应式设计和移动端适配 |
| 023.md | #36 | TMS NL-Ops演示系统任务023: LangGraph.js v1环境配置和基础架构 |
| 024.md | #37 | TMS NL-Ops演示系统任务024: Agent状态定义和管理 |
| 025.md | #38 | TMS NL-Ops演示系统任务025: 工具集实现 |
| 026.md | #39 | TMS NL-Ops演示系统任务026: Supervisor节点实现 |
| 027.md | #40 | TMS NL-Ops演示系统任务027: LangGraph工作流定义和编译 |
| 028.md | #41 | TMS NL-Ops演示系统任务028: 流式处理和实时响应实现 |
| 029.md | #42 | TMS NL-Ops演示系统任务029: Agent测试和调试工具 |
| 030.md | #43 | 生成式UI组件架构设计 |
| 031.md | #44 | 订单表格组件 (OrderTable) 实现 |
| 032.md | #45 | 排车计划组件 (DispatchPlan) 实现 |
| 033.md | #46 | 车辆跟踪组件 (VehicleTracker) 实现 |
| 034.md | #47 | 回单查看组件 (PODViewer) 实现 |
| 035.md | #48 | 生成式UI与LangGraph集成 |
| 036.md | #49 | Vercel AI SDK v4集成和API网关实现 |
| 037.md | #50 | 主聊天界面实现 (传统UI与NL-Ops对比) |
| 038.md | #51 | 端到端集成测试套件开发 |
| 039.md | #52 | 性能优化和缓存策略 |
| 040.md | #53 | 部署配置和CI/CD流水线 |
| 041.md | #54 | 演示数据准备和场景设计 |
| 042.md | #55 | 用户培训和文档编写 |

## 创建统计

- **开始时间:** 2025年09月20日 13:47:07
- **结束时间:** 2025年09月20日 13:50:14
- **处理文件总数:** 40
- **成功创建:** 40
- **创建失败:** 0
- **跳过:** 0
- **成功率:** 100%

## 注意事项

- 每次创建后暂停1秒避免rate limiting
- 所有sub-issues都使用了enhancement标签
- 所有sub-issues都链接到父issue #1
- Body内容超过2000字符的进行了截断处理
- 使用bash脚本解决了PowerShell编码和转义问题

## 使用的脚本

主要创建脚本: `F:\code1\tms\scripts\create-all-sub-issues.sh`

**脚本特性:**
- 自动提取title字段作为issue标题
- 使用awk去除frontmatter获取body内容
- 处理特殊字符和编码问题
- 自动截断过长的body内容
- 内置1秒延迟避免rate limiting
- 详细的成功/失败统计和日志记录