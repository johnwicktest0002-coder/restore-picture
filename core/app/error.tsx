"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="content" className="flex min-h-screen flex-col items-start justify-center bg-[#0A0A0A] px-6 text-[#F5F5F0]">
      <p className="font-ibm-mono text-[12px] font-bold tracking-[2px] text-[#C8C4B8]">[错误]</p>
      <h1 className="mt-4 font-grotesk text-4xl font-bold">这页没有加载出来。</h1>
      <p className="mt-4 max-w-md font-grotesk text-[16px] leading-7 text-[#A3A39C]">
        再试一次。如果是你自己部署的站点，看一下运行 Next.js 的进程日志。
      </p>
      <button type="button" onClick={reset} className="mt-8 h-12 bg-[#C8C4B8] px-6 font-grotesk font-bold text-[#0A0A0A]">
        再试一次
      </button>
    </main>
  );
}
