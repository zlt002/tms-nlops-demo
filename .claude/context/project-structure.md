---
created: 2025-09-20T03:46:14Z
last_updated: 2025-09-20T03:51:08Z
version: 1.0
author: Claude Code PM System
---

# 项目结构

## 目录组织

```
F:\code1\tms\
├── .claude/                      # Claude Code PM 系统目录
│   ├── CLAUDE.md                # 系统规则和指令
│   ├── agents/                  # 专门的 AI 代理定义
│   │   ├── code-analyzer.md
│   │   ├── file-analyzer.md
│   │   ├── parallel-worker.md
│   │   └── test-runner.md
│   ├── commands/                # 命令定义
│   │   ├── code-rabbit.md
│   │   ├── context/             # 上下文管理命令
│   │   │   ├── create.md
│   │   │   ├── prime.md
│   │   │   └── update.md
│   │   └── pm/                  # 项目管理命令
│   │       ├── blocked.md
│   │       ├── clean.md
│   │       ├── epic-close.md
│   │       ├── epic-decompose.md
│   │       ├── epic-edit.md
│   │       ├── epic-list.md
│   │       ├── epic-merge.md
│   │       ├── epic-oneshot.md
│   │       ├── epic-refresh.md
│   │       ├── epic-show.md
│   │       ├── epic-start-worktree.md
│   │       └── ... (更多 pm 命令)
│   ├── context/                 # 项目上下文文件（此目录）
│   ├── epics/                   # Epic 工作区
│   ├── prds/                    # 产品需求文档
│   ├── rules/                   # 额外的规则文件
│   └── scripts/                 # 实用脚本
├── a/                           # 开发产物目录
├── install/                     # 安装脚本
├── .gitignore                   # Git 忽略规则
├── AGENTS.md                   # 代理文档
├── CLAUDE.md                   # 项目特定的 Claude 指令
├── COMMANDS.md                 # 命令参考
├── LICENSE                     # MIT 许可证
├── README.md                   # 主要项目文档
├── 大概的思路.md               # 项目思路和想法（中文）
└── 要演练的方向.md             # 练习方向（中文）
```

## 关键目录

### `.claude/` - Claude Code PM 系统
- **用途**: 包含所有 Claude Code PM 系统文件和配置
- **关键文件**:
  - `CLAUDE.md` - 应复制到项目根目录的系统规则
  - `agents/` - 不同任务类型的专门代理定义
  - `commands/` - PM 系统的所有可用命令
  - `context/` - 持久的项目上下文和状态

### `epics/` - Epic 工作区
- **用途**: 包含每个 epic/功能的工作区目录
- **结构**: `.claude/epics/[epic-name]/`
- **内容**:
  - `epic.md` - 实施计划
  - `[issue-id].md` - 单个任务文件
  - `updates/` - 进行中的更新

### `prds/` - 产品需求
- **用途**: 存储所有产品需求文档
- **格式**: 带有结构化需求的 Markdown 文件

### `context/` - 项目上下文
- **用途**: 维护项目范围的上下文和状态
- **文件**:
  - `progress.md` - 当前状态和下一步
  - `project-structure.md` - 此文件
  - `tech-context.md` - 技术和依赖
  - 以及其他上下文文件...

## 文件命名模式

### Markdown 文件
- 文件名使用 kebab-case（例如：`epic-decompose.md`）
- 中文文档文件使用中文名称
- 所有目录都有 README.md 用于文档

### 上下文文件
- 上下文文件使用标准化名称
- 都使用 `.md` 扩展名
- 包含带有元数据的前置信息

### Epic 文件
- 以 epic/功能命名
- 分解期间任务文件以数字开头
- GitHub 同步后，重命名为匹配问题 ID

## 模块组织

项目遵循模块化结构：
1. **核心系统** - Claude Code PM 框架
2. **命令** - 单个命令实现
3. **代理** - 专门的 AI 工作者
4. **上下文** - 项目状态管理
5. **工作区** - 隔离的 epic 环境