"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export default function GlitchText({
  text,
  className = "",
  delay = 0,
  speed = 40,
}: TypewriterTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"idle" | "typing" | "done">("idle");
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let interval = 0;
    let startTimer = 0;
    let doneTimer = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun.current) return;
        hasRun.current = true;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) return;

        startTimer = window.setTimeout(() => {
          setPhase("typing");
          let i = 0;
          interval = window.setInterval(() => {
            i += 1;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) {
              window.clearInterval(interval);
              doneTimer = window.setTimeout(() => setPhase("done"), 500);
            }
          }, speed);
        }, delay);
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearInterval(interval);
      window.clearTimeout(startTimer);
      window.clearTimeout(doneTimer);
    };
  }, [text, speed, delay]);

  const typing = phase === "typing";

  return (
    <span ref={ref} className={className} style={{ position: "relative", display: "inline-block" }}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" style={{ visibility: typing ? "hidden" : "visible", whiteSpace: "pre" }}>
        {text}
      </span>
      {typing && (
        <span aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, whiteSpace: "pre" }}>
          {displayed}
          <span
            style={{
              display: "inline-block",
              width: "0.06em",
              height: "0.85em",
              backgroundColor: "currentColor",
              marginLeft: "2px",
              verticalAlign: "middle",
              animation: "tw-blink 0.7s step-end infinite",
            }}
          />
        </span>
      )}
      <style>{`
        @keyframes tw-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
