"use client";

const CURSORS = [
  {
    name: "相册",
    color: "#C8C4B8",
    textColor: "#0A0A0A",
    animName: "cursor-album",
    duration: "18s",
    keyframes: `@keyframes cursor-album {
      0%   { transform: translate(8vw, 58vh); }
      20%  { transform: translate(28vw, 70vh); }
      45%  { transform: translate(46vw, 62vh); }
      70%  { transform: translate(22vw, 78vh); }
      100% { transform: translate(8vw, 58vh); }
    }`,
  },
  {
    name: "隐藏",
    color: "#FF6B35",
    textColor: "#FFFFFF",
    animName: "cursor-hidden",
    duration: "22s",
    keyframes: `@keyframes cursor-hidden {
      0%   { transform: translate(62vw, 60vh); }
      25%  { transform: translate(40vw, 74vh); }
      55%  { transform: translate(58vw, 68vh); }
      80%  { transform: translate(34vw, 80vh); }
      100% { transform: translate(62vw, 60vh); }
    }`,
  },
  {
    name: "微信",
    color: "#4ADE80",
    textColor: "#0A0A0A",
    animName: "cursor-wechat",
    duration: "26s",
    keyframes: `@keyframes cursor-wechat {
      0%   { transform: translate(18vw, 76vh); }
      30%  { transform: translate(48vw, 64vh); }
      60%  { transform: translate(30vw, 82vh); }
      100% { transform: translate(18vw, 76vh); }
    }`,
  },
  {
    name: "QQ",
    color: "#60A5FA",
    textColor: "#0A0A0A",
    animName: "cursor-qq",
    duration: "30s",
    keyframes: `@keyframes cursor-qq {
      0%   { transform: translate(70vw, 78vh); }
      35%  { transform: translate(52vw, 66vh); }
      70%  { transform: translate(36vw, 84vh); }
      100% { transform: translate(70vw, 78vh); }
    }`,
  },
];

export default function CollabCursors() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block" aria-hidden="true">
      <style>{CURSORS.map((cursor) => cursor.keyframes).join("\n")}</style>
      {CURSORS.map((cursor) => (
        <div
          key={cursor.name}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            animation: `${cursor.animName} ${cursor.duration} cubic-bezier(0.4, 0, 0.2, 1) infinite`,
            willChange: "transform",
          }}
        >
          <svg width="16" height="18" viewBox="0 0 20 22" fill="none" style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.7))" }}>
            <path d="M2 2L18 10L10 12L6 20L2 2Z" fill={cursor.color} stroke="#0A0A0A" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <div
            style={{
              position: "absolute",
              left: "14px",
              top: "14px",
              backgroundColor: cursor.color,
              padding: "2px 8px",
              fontFamily: "inherit",
              fontSize: "11px",
              fontWeight: 700,
              color: cursor.textColor,
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
              boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            {cursor.name}
          </div>
        </div>
      ))}
    </div>
  );
}
