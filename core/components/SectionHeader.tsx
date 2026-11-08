export default function SectionHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-[900px]">
      {kicker ? (
        <p className="font-ibm-mono text-[11px] font-bold tracking-[2px] text-[#C8C4B8]">{kicker}</p>
      ) : null}
      <h2 className="mt-3 font-grotesk text-[clamp(28px,5vw,48px)] font-bold leading-[1.1] tracking-[-0.5px] text-[#F5F5F0]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 font-grotesk text-[15px] leading-[1.7] text-[#888]">{subtitle}</p>
      ) : null}
    </div>
  );
}
