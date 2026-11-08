import { OgImage } from "@/lib/og-card";

export const alt =
  "Restore Picture — find hidden iPhone photos and search images saved from WeChat, QQ, and WhatsApp";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return OgImage();
}
