---
title: TMS NL-Ops 演示系统实现史诗
status: backlog
created: 2025-09-20T04:00:00Z
updated: 2025-09-20T04:00:00Z
version: 1.0
---

# 技术实现史诗：TMS NL-Ops 演示系统

## 概述

基于已创建的PRD，本文档将详细规划TMS NL-Ops演示系统的技术实现方案。该系统将展示传统UI与AI生成式UI在复杂物流运输业务场景中的对比。

## 技术架构决策

### 核心技术栈
- **前端框架**: Next.js 14+ (App Router)
- **状态管理**: React Server Components + Client Components
- **AI编排**: LangGraph.js (JavaScript版本)
- **AI交互**: Vercel AI SDK
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **数据库**: 本地JSON文件（演示阶段）

### 架构模式
1. **Supervisor Agent架构**: 使用LangGraph.js实现智能决策节点
2. **双UI模式**: 并行实现传统UI和生成式UI
3. **API分层**: 业务API与AI网关分离
4. **组件化**: 可复用的生成式UI组件库

## 实施策略

### 第一阶段：基础设施（第1周）

#### 1.1 项目初始化
- 创建Next.js项目结构
- 配置TypeScript和Tailwind CSS
- 安装核心依赖：
  ```bash
  npm install @langchain/langgraph @langchain/core @ai-sdk/react openai
  ```

#### 1.2 目录结构设计
```
/tms-demo
├── /app
│   ├── /api/tms           # 业务API端点
│   │   ├── /orders        # 订单管理
│   │   ├── /dispatch      # 排车调度
│   │   ├── /tracking      # 在途跟踪
│   │   └── /pod           # 回单管理
│   ├── /api/chat          # LangGraph网关
│   ├── /tms-dashboard     # 传统UI界面
│   └── /page.tsx          # 主聊天界面
├── /agent                 # LangGraph.js实现
│   ├── /graph             # 工作流定义
│   ├── /nodes             # 节点实现
│   ├── /tools             # 工具定义
│   └── /state             # 状态管理
├── /components
│   ├── /tms               # 传统UI组件
│   └── /generative-ui     # 生成式UI组件
└── /data                  # 模拟数据
```

#### 1.3 数据模型设计
```typescript
// 订单数据模型
interface Order {
  id: string;
  customerId: string;
  customerName: string;
  origin: Location;
  destination: Location;
  goods: Goods[];
  status: OrderStatus;
  timeline: TimelineEvent[];
}

// 车辆数据模型
interface Vehicle {
  id: string;
  type: VehicleType;
  capacity: number;
  currentLocation: Location;
  status: VehicleStatus;
  driver: Driver;
}

// 发车单数据模型
interface Dispatch {
  id: string;
  orders: string[];
  vehicle: Vehicle;
  route: Route;
  status: DispatchStatus;
}
```

### 第二阶段：核心业务API（第1-2周）

#### 2.1 订单管理API
- `GET /api/tms/orders` - 查询订单列表
- `POST /api/tms/orders` - 创建新订单
- `GET /api/tms/orders/[id]` - 获取订单详情
- `PUT /api/tms/orders/[id]` - 更新订单状态

#### 2.2 排车调度API
- `GET /api/tms/dispatch/pending` - 获取待调度订单
- `GET /api/tms/vehicles/available` - 获取可用车辆
- `POST /api/tms/dispatch` - 创建发车单
- `PUT /api/tms/dispatch/[id]/status` - 更新发车状态

#### 2.3 在途跟踪API
- `GET /api/tms/tracking/orders/[id]` - 订单轨迹查询
- `GET /api/tms/tracking/vehicles/[id]` - 车辆位置查询
- `POST /api/tms/tracking/events` - 上报位置事件

#### 2.4 回单管理API
- `POST /api/tms/pod/[orderId]` - 上传回单
- `GET /api/tms/pod/verify` - 验证回单
- `PUT /api/tms/pod/[id]/status` - 更新回单状态

### 第三阶段：传统UI实现（第2周）

#### 3.1 订单管理界面
- 订单列表页面（筛选、排序、分页）
- 订单创建表单（客户选择、地址输入、货物信息）
- 订单详情模态框（状态时间线、操作历史）

#### 3.2 排车调度界面
- 待调度订单池（可多选）
- 车辆资源管理表格
- 拖拽排车界面（订单→车辆映射）
- 路线规划可视化（简化版地图）

#### 3.3 在途跟踪界面
- 实时地图视图（车辆标记）
- 订单状态时间线组件
- 异常事件列表和告警

#### 3.4 回单管理界面
- 回单上传组件（拖拽上传）
- 回单审核列表（批量操作）
- 回单详情查看（图片放大、备注）

### 第四阶段：LangGraph.js智能代理（第2-3周）

#### 4.1 状态定义
```typescript
interface AgentState {
  messages: BaseMessage[];
  context: {
    userRole: 'dispatcher' | 'customer_service' | 'manager';
    currentTask?: string;
  };
  data: {
    orders?: Order[];
    vehicles?: Vehicle[];
    dispatch?: Dispatch;
  };
  ui: {
    component?: string;
    props?: Record<string, any>;
  };
}
```

#### 4.2 工具实现
```typescript
// 订单查询工具
const queryOrdersTool = tool(
  async ({ customerName, status, dateRange }) => {
    const response = await fetch('/api/tms/orders?' + new URLSearchParams({
      customerName,
      status,
      ...dateRange
    }));
    return response.json();
  },
  {
    name: "queryOrders",
    description: "查询订单列表，支持客户名称、状态和日期范围筛选",
    schema: z.object({
      customerName: z.string().optional(),
      status: z.string().optional(),
      dateRange: z.object({
        start: z.string(),
        end: z.string()
      }).optional()
    })
  }
);

// 创建订单工具
const createOrderTool = tool(
  async ({ customerName, origin, destination, goods }) => {
    const response = await fetch('/api/tms/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerName, origin, destination, goods })
    });
    return response.json();
  },
  {
    name: "createOrder",
    description: "创建新的运输订单",
    schema: z.object({
      customerName: z.string(),
      origin: z.object({
        address: z.string(),
        contact: z.string()
      }),
      destination: z.object({
        address: z.string(),
        contact: z.string()
      }),
      goods: z.array(z.object({
        name: z.string(),
        quantity: z.number(),
        weight: z.number(),
        special: z.string().optional()
      }))
    })
  }
);

// 排车调度工具
const scheduleDispatchTool = tool(
  async ({ orderIds, vehiclePreference }) => {
    const response = await fetch('/api/tms/dispatch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderIds, vehiclePreference })
    });
    return response.json();
  },
  {
    name: "scheduleDispatch",
    description: "将多个订单合并排车",
    schema: z.object({
      orderIds: z.array(z.string()),
      vehiclePreference: z.string().optional()
    })
  }
);

// 车辆位置查询工具
const trackVehicleTool = tool(
  async ({ vehicleId }) => {
    const response = await fetch(`/api/tms/tracking/vehicles/${vehicleId}`);
    return response.json();
  },
  {
    name: "trackVehicle",
    description: "查询车辆的实时位置和预计到达时间",
    schema: z.object({
      vehicleId: z.string()
    })
  }
);

// 回单查询工具
const queryPODTool = tool(
  async ({ orderId }) => {
    const response = await fetch(`/api/tms/pod/${orderId}`);
    return response.json();
  },
  {
    name: "queryPOD",
    description: "查询订单的回单信息",
    schema: z.object({
      orderId: z.string()
    })
  }
);
```

#### 4.3 Supervisor节点实现
```typescript
import { createReactAgent } from "@langchain/langgraph/prebuilt";

const supervisorNode = async (state: AgentState) => {
  // 根据用户输入决定使用哪个工具
  const systemPrompt = `
    你是一个智能运输管理助手，帮助用户处理订单、排车、跟踪和回单等业务。

    根据用户的请求，选择合适的工具来完成任务：
    1. 查询订单 - 使用 queryOrders
    2. 创建订单 - 使用 createOrder
    3. 排车调度 - 使用 scheduleDispatch
    4. 车辆跟踪 - 使用 trackVehicle
    5. 回单查询 - 使用 queryPOD

    完成工具调用后，使用相应的UI组件来展示结果：
    - OrderTable: 展示订单列表
    - OrderForm: 创建订单表单
    - DispatchPlan: 展示排车计划
    - VehicleTracker: 展示车辆跟踪信息
    - PODViewer: 展示回单信息
  `;

  const agent = createReactAgent({
    llm: openaiModel,
    tools: [queryOrdersTool, createOrderTool, scheduleDispatchTool, trackVehicleTool, queryPODTool],
    systemMessage: systemPrompt
  });

  return await agent.invoke(state);
};
```

#### 4.4 工作流定义
```typescript
const workflow = new StateGraph<AgentState>({
  channels: {
    messages: MessagesAnnotation,
    context: {
      reducer: (state, update) => ({ ...state, ...update }),
      default: () => ({})
    },
    data: {
      reducer: (state, update) => ({ ...state, ...update }),
      default: () => ({})
    },
    ui: {
      reducer: (state, update) => ({ ...state, ...update }),
      default: () => ({})
    }
  }
});

workflow.addNode("supervisor", supervisorNode);
workflow.addNode("tools", new ToolNode(tools));

workflow.addEdge("__start__", "supervisor");
workflow.addConditionalEdges(
  "supervisor",
  (state: AgentState) => {
    const lastMessage = state.messages[state.messages.length - 1];
    return lastMessage.tool_calls ? "tools" : "__end__";
  }
);
workflow.addEdge("tools", "supervisor");

export const graph = workflow.compile();
```

### 第五阶段：生成式UI组件（第3周）

#### 5.1 订单表格组件
```typescript
// components/generative-ui/OrderTable.tsx
interface OrderTableProps {
  orders: Order[];
  onOrderClick?: (orderId: string) => void;
}

export function OrderTable({ orders, onOrderClick }: OrderTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th>订单号</th>
            <th>客户</th>
            <th>路线</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} onClick={() => onOrderClick?.(order.id)}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.origin.address} → {order.destination.address}</td>
              <td>
                <OrderStatusBadge status={order.status} />
              </td>
              <td>
                <button className="text-blue-600 hover:text-blue-900">
                  查看详情
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

#### 5.2 排车计划组件
```typescript
// components/generative-ui/DispatchPlan.tsx
interface DispatchPlanProps {
  orders: Order[];
  vehicle: Vehicle;
  route: Route;
  onConfirm: () => void;
}

export function DispatchPlan({ orders, vehicle, route, onConfirm }: DispatchPlanProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">排车计划</h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="font-medium text-gray-700">车辆信息</h4>
          <p>{vehicle.type} - {vehicle.driver.name}</p>
          <p>当前位置: {vehicle.currentLocation.address}</p>
        </div>

        <div>
          <h4 className="font-medium text-gray-700">路线规划</h4>
          <p>总里程: {route.distance}km</p>
          <p>预计时间: {route.duration}</p>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">订单列表</h4>
        <OrderList orders={orders} />
      </div>

      <button
        onClick={onConfirm}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        确认发车
      </button>
    </div>
  );
}
```

#### 5.3 车辆跟踪组件
```typescript
// components/generative-ui/VehicleTracker.tsx
interface VehicleTrackerProps {
  vehicle: Vehicle;
  currentLocation: Location;
  estimatedArrival: Date;
  route: Route;
}

export function VehicleTracker({ vehicle, currentLocation, estimatedArrival, route }: VehicleTrackerProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">车辆跟踪</h3>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{vehicle.licensePlate}</div>
          <div className="text-sm text-gray-500">车牌号</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {estimatedArrival.toLocaleTimeString()}
          </div>
          <div className="text-sm text-gray-500">预计到达</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{vehicle.speed}km/h</div>
          <div className="text-sm text-gray-500">当前速度</div>
        </div>
      </div>

      {/* 简化地图视图 */}
      <div className="bg-gray-100 h-48 rounded mb-4 relative">
        <MiniMap vehicle={vehicle} route={route} />
      </div>

      <div className="text-sm">
        <p>当前位置: {currentLocation.address}</p>
        <p>司机: {vehicle.driver.name} ({vehicle.driver.phone})</p>
      </div>
    </div>
  );
}
```

### 第六阶段：集成与测试（第4周）

#### 6.1 API网关实现
```typescript
// app/api/chat/route.ts
import { graph } from "@/agent";
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  // 转换消息格式
  const langchainMessages = messages.map(msg => ({
    role: msg.role,
    content: msg.content
  }));

  // 流式调用LangGraph
  const stream = await graph.stream({
    messages: langchainMessages,
    context: { userRole: 'dispatcher' }
  });

  // 转换为Vercel AI SDK格式
  const aiStream = transformLangGraphStream(stream);

  return streamText({
    model: openai('gpt-4'),
    messages,
    stream: aiStream
  });
}
```

#### 6.2 主聊天界面
```typescript
// app/page.tsx
'use client';
import { useChat } from '@ai-sdk/react';
import { OrderTable } from '@/components/generative-ui/OrderTable';
import { DispatchPlan } from '@/components/generative-ui/DispatchPlan';
import { VehicleTracker } from '@/components/generative-ui/VehicleTracker';

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex h-screen">
      {/* 传统UI导航 */}
      <nav className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">TMS演示系统</h2>
        <ul>
          <li><a href="/tms-dashboard" className="block py-2 hover:bg-gray-700">传统UI模式</a></li>
          <li className="font-semibold text-blue-400">AI交互模式</li>
        </ul>
      </nav>

      {/* 聊天界面 */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map(m => (
            <div key={m.id} className="mb-4">
              <div className={`font-semibold ${m.role === 'user' ? 'text-blue-600' : 'text-green-600'}`}>
                {m.role === 'user' ? '用户' : 'AI助手'}:
              </div>

              {m.content && (
                <div className="mt-1">{m.content}</div>
              )}

              {/* 渲染动态UI组件 */}
              {m.tool_calls?.map(toolCall => {
                const props = toolCall.args;

                switch (toolCall.toolName) {
                  case 'showOrders':
                    return <OrderTable key={toolCall.id} orders={props.orders} />;

                  case 'showDispatchPlan':
                    return (
                      <DispatchPlan
                        key={toolCall.id}
                        orders={props.orders}
                        vehicle={props.vehicle}
                        route={props.route}
                        onConfirm={() => handleDispatchConfirm(props.dispatchId)}
                      />
                    );

                  case 'showVehicleTracking':
                    return (
                      <VehicleTracker
                        key={toolCall.id}
                        vehicle={props.vehicle}
                        currentLocation={props.currentLocation}
                        estimatedArrival={new Date(props.estimatedArrival)}
                        route={props.route}
                      />
                    );

                  default:
                    return null;
                }
              })}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="border-t p-4">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="请输入您的需求..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
      </div>
    </div>
  );
}
```

#### 6.3 测试用例设计
```typescript
// tests/integration/nl-ops.test.ts
describe('NL-Ops集成测试', () => {
  test('自然语言创建订单', async () => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{
          role: 'user',
          content: '帮未来科技创建一个从上海到北京的订单，10箱服务器，明天下午3点前取货'
        }]
      })
    });

    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(data.choices[0].message.tool_calls).toContainEqual(
      expect.objectContaining({
        toolName: 'createOrder'
      })
    );
  });

  test('排车调度流程', async () => {
    // 测试完整的排车流程
  });

  test('车辆跟踪查询', async () => {
    // 测试车辆位置查询和UI渲染
  });
});
```

## 部署和演示

### 部署配置
```yaml
# vercel.json
{
  "functions": {
    "app/api/chat/route.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "OPENAI_API_KEY": "@openai_api_key",
    "NEXT_PUBLIC_APP_URL": "https://tms-demo.vercel.app"
  }
}
```

### 演示场景
1. **对比演示**: 展示同一任务在传统UI和NL-Ops模式下的操作步骤对比
2. **实时演示**: 通过大屏幕展示AI理解用户输入并动态生成UI的过程
3. **数据收集**: 记录用户操作时间和满意度，生成对比报告

## 成功标准

### 技术指标
- 自然语言响应时间 < 3秒
- UI组件渲染成功率 > 95%
- 端到端操作完成时间减少 50%+
- 系统稳定性 99.5%+

### 用户体验指标
- 新用户上手时间 < 10分钟
- NL-Ops模式使用率 > 70%
- 用户满意度 > 4.5/5

## 风险和缓解措施

1. **LLM理解准确性**
   - 风险：对复杂业务场景理解不准确
   - 缓解：细化工具描述，增加示例，使用few-shot提示

2. **系统响应延迟**
   - 风险：多步骤操作导致延迟过高
   - 缓解：并行处理，流式传输，结果缓存

3. **UI组件复杂性**
   - 风险：动态UI组件难以满足所有场景
   - 缓解：组件库设计，可配置属性，渐进式增强

## 下一步行动

1. 创建GitHub仓库和issue任务
2. 设置开发环境和CI/CD流程
3. 开始第一阶段：项目初始化
4. 准备演示数据集和测试用例