import { ImageResponse } from "next/og";
import { OG_DESCRIPTION, ORG_NAME, PRODUCT_NAME } from "@/lib/site";

export const alt = `${PRODUCT_NAME} — a Unit 2 Networks of Exchange pilot from ${ORG_NAME} for the May 2027 exam.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f1e8",
          color: "#2d241c",
          padding: "64px 72px",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 28, letterSpacing: 1, color: "#6b5344" }}>
            {ORG_NAME}
          </div>
          <div style={{ fontSize: 64, lineHeight: 1.1, fontWeight: 600 }}>
            Anannt
          </div>
          <div style={{ fontSize: 32, color: "#4a3c32" }}>
            AP World History: Modern
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            fontSize: 28,
            lineHeight: 1.35,
            maxWidth: 920,
            fontFamily: "Georgia, serif",
          }}
        >
          <div>
            Unit 2 · Networks of Exchange · May 2027 exam format
          </div>
          <div style={{ fontSize: 22, color: "#6b5344" }}>{OG_DESCRIPTION}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
