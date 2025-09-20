import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">TMS NL-Ops 演示系统</h1>
      </div>

      <div className="relative flex place-items-center">
        <h2 className="text-2xl font-semibold">自然语言操作演示平台</h2>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h3 className="mb-3 text-2xl font-semibold">
            订单管理
          </h3>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            通过自然语言创建和管理运输订单
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h3 className="mb-3 text-2xl font-semibold">
            排车调度
          </h3>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            智能车辆调度和路径规划
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h3 className="mb-3 text-2xl font-semibold">
            实时跟踪
          </h3>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            货物运输实时状态监控
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h3 className="mb-3 text-2xl font-semibold">
            电子回单
          </h3>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            数字化回单管理和验证
          </p>
        </div>
      </div>

      <Button className="mt-8">
        开始演示
      </Button>
    </main>
  );
}
