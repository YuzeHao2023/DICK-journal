import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const EDITOR_EMAIL = "m_turner@163.com";
export const PAY_QR_PUBLIC_FILE = "pay-qr.png";

const payQrPath = fileURLToPath(new URL("../../public/pay-qr.png", import.meta.url));

export const hasPayQrImage = existsSync(payQrPath);
