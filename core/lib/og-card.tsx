import { ImageResponse } from "next/og";

export function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          color: "#F5F5F0",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: 22, height: 22, background: "#C8C4B8", marginRight: 16 }} />
          <div style={{ fontSize: 24, letterSpacing: 4, fontWeight: 700 }}>RESTORE PICTURE</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1 }}>
            Find the photos
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1,
              color: "#C8C4B8",
            }}
          >
            your iPhone buried.
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#9A9A9A", lineHeight: 1.4 }}>
            Hidden album, Recently Deleted, and images saved from WeChat, QQ, and WhatsApp.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22 }}>
          <div style={{ color: "#888888" }}>On your iPhone. No guarantee for purged files.</div>
          <div style={{ color: "#C8C4B8" }}>Personal utility</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
