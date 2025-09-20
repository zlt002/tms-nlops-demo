---
created: 2025-09-20T03:46:14Z
last_updated: 2025-09-20T06:44:57Z
version: 1.4
author: Claude Code PM System
---

# 技术背景

## 开发环境

### 操作系统
- **平台**: Windows (win32)
- **文件系统**: NTFS
- **路径分隔符**: 反斜杠 (\)

### 核心技术
- **语言**: 英语（主要），中文（文档用）
- **CLI 工具**: Claude Code
- **版本控制**: Git（已初始化）
- **远程平台**: GitHub（已配置：https://github.com/zlt002/tms-nlops-demo）
- **开发工作树**: ../epic-tms-nlops-demo（用于并行开发）

### 项目依赖

#### 外部依赖
- **GitHub CLI** - GitHub 集成必需
- **gh-sub-issue 扩展** - 用于父子问题关系
- **PowerShell/Bash** - 用于脚本执行

#### 已配置的技术栈 (TMS NL-Ops 项目)
- **前端**: Next.js 15+ (App Router) ✅
- **UI**: React 18 + shadcn/ui v2 ✅
- **AI编排**: LangGraph.js v1.0.0 (计划中)
- **AI交互**: Vercel AI SDK v4.0.0 (计划中)
- **数据库**: PostgreSQL 17.x ✅
- **ORM**: Prisma 5.8.1 ✅
- **语言**: TypeScript 5.5+ ✅
- **CSS框架**: Tailwind CSS v4 ✅
- **状态管理**: Zustand + React Query ✅
- **API客户端**: Axios + Zod验证 ✅
- **开发工具**: ESLint + Prettier + Husky + Commitlint ✅
- **测试框架**: Jest + React Testing Library ✅

#### 数据库配置
- **主机**: 47.115.43.94
- **数据库**: HhnthnBBEWhCdiZL
- **用户**: postgres

## 开发工具

### 文本编辑器/IDE
- 任何支持 markdown 的标准文本编辑器
- 无特定 IDE 要求

### 命令行工具
- **git** - 版本控制
- **gh** - GitHub CLI
- **curl/wget** - 用于下载安装脚本
- **Claude Code** - 带 PM 系统的 AI 助手

### 开发工具（已安装）
- **Node.js 20+** - JavaScript 运行时 ✅
- **PostgreSQL 客户端** - 数据库连接 ✅
- **Prisma CLI** - 数据库迁移 ✅
- **shadcn CLI** - UI 组件管理 ✅
- **tsx** - TypeScript 执行器 ✅
- **Docker** - 容器化部署 ✅

### 文件格式
- **Markdown (.md)** - 主要文档格式
- **YAML** - Markdown 文件的前置元数据
- **Text** - 配置和脚本文件

## 系统要求

### 最低要求
- 命令行访问
- GitHub 操作的互联网连接
- 已安装 Git
- Claude Code 访问权限

### 可选要求
- 远程仓库的 GitHub 账户
- 支持 ANSI 颜色的终端（更好的用户体验）

## 配置文件

### .gitignore
项目的标准 git 忽略模式

### CLAUDE.md
Claude 的项目特定指令和规则

## 构建和部署

### 无构建过程
这是一个文档和配置系统：
- 无需编译
- 无构建脚本
- 无部署管道

### 分发
- 通过 GitHub 仓库分发
- 通过 shell 脚本安装
- 手动复制/粘贴安装选项

## 安全考虑

### 身份验证
- GitHub CLI 需要身份验证
- 目前没有其他身份验证系统

### 数据存储
- 所有数据存储在纯文本文件中
- 本地文件无加密
- GitHub 处理仓库安全

## 性能特征

### 轻量级系统
- 最少的资源需求
- 无后台进程
- 基于文件的存储（快速读/写）

### 可扩展性
- 为中小型团队设计
- 受 GitHub API 速率限制
- 文件系统性能取决于本地存储