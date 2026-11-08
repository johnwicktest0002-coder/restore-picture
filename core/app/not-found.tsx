import Link from "next/link";

export default function NotFound() {
  return (
    <main id="content" className="flex min-h-screen flex-col items-start justify-center bg-[#0A0A0A] px-6 text-[#F5F5F0]">
      <p className="font-ibm-mono text-[12px] font-bold tracking-[2px] text-[#C8C4B8]">404</p>
      <h1 className="mt-4 font-grotesk text-4xl font-bold md:text-6xl">这页没有照片。</h1>
      <p className="mt-4 max-w-md font-grotesk text-[16px] leading-7 text-[#A3A39C]">地址不对。回到首页，从隐藏相册和聊天图片那几节看起。</p>
      <Link href="/" className="mt-8 flex h-12 items-center bg-[#C8C4B8] px-6 font-grotesk font-bold text-[#0A0A0A]">
        回到首页
      </Link>
    </main>
  );
}
