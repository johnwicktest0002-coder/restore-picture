import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { pageX } from "@/lib/ui";

export default function Subpage({
  kicker,
  title,
  lede,
  children,
}: {
  kicker: string;
  title: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <main id="content" className="flex min-h-screen w-full flex-col bg-[#0A0A0A] pt-[60px]">
      <Navbar />
      <article className={`${pageX} mx-auto w-full max-w-[1440px] py-16 md:py-24`}>
        <p className="font-ibm-mono text-[12px] font-bold tracking-[2px] text-[#C8C4B8]">{kicker}</p>
        <h1 className="mt-4 max-w-[12em] font-grotesk text-[clamp(36px,6vw,68px)] font-bold leading-[1.08] tracking-[-1px] text-[#F5F5F0]">
          {title}
        </h1>
        <p className="mt-6 max-w-[62ch] font-grotesk text-[16px] leading-[1.75] text-[#C8C8C2] md:text-[18px]">
          {lede}
        </p>
        <div className="mt-12 flex max-w-[68ch] flex-col gap-10 font-grotesk text-[15px] leading-[1.85] text-[#C8C8C2] md:text-[16px]">
          {children}
        </div>
      </article>
      <Footer />
    </main>
  );
}

export function Subheading({ children }: { children: ReactNode }) {
  return <h2 className="font-grotesk text-[28px] font-bold tracking-[-0.5px] text-[#F5F5F0]">{children}</h2>;
}

export function Subblock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 border-t border-[#1D1D1D] pt-8">
      <Subheading>{title}</Subheading>
      {children}
    </section>
  );
}
