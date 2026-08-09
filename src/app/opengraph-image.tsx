import { ImageResponse } from "next/og";

export const alt = "Menma — Jivesh Lakhani, AI Product Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 70,
        background: "#191918",
        color: "#f4f2ec",
        fontFamily: "sans-serif",
        backgroundImage:
          "linear-gradient(rgba(244,242,236,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(244,242,236,.05) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22 }}>
        <span style={{ color: "#f2a340" }}>MENMA / Jivesh Lakhani</span>
        <span style={{ color: "#a8afba" }}>AI Product Engineer · Founding Engineer</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 1020 }}>
        <div style={{ fontSize: 79, lineHeight: 0.97, letterSpacing: "-0.055em" }}>
          AI products built for contact with production.
        </div>
        <div style={{ marginTop: 34, display: "flex", fontSize: 22, color: "#a8afba" }}>
          AI agents · Backend platforms · Browser automation · Cloud infrastructure
        </div>
      </div>
    </div>,
    size,
  );
}
