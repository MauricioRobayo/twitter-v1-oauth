import crypto from "crypto";

// https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent#Description
export function percentEncode(str: string): string {
  return encodeURIComponent(str)
    .replace(/[!'()]/g, escape)
    .replace(/\*/g, "%2A");
}

export function timestamp(): number {
  return Math.round(Date.now() / 1000);
}

export function randomString(length: number): string {
  if (length <= 0) {
    return "";
  }

  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .substring(0, length);
}
