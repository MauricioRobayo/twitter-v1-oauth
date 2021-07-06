import qs from "querystring";
import { percentEncode } from "./authorization/helpers";
import { Authorization, Options } from "./types";

function buildBody(
  bodyParams: Record<string, string | number | boolean>
): string {
  return qs.stringify(bodyParams, "&", "=", {
    encodeURIComponent: percentEncode,
  });
}

export default function buildHeaders(options: Options): Authorization {
  const body = options.bodyParams ? buildBody(options.bodyParams) : "";
  return {
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Length": Buffer.byteLength(body),
    Authorization: authorization(options),
    "cache-control": "no-cache",
  };
}

function authorization(_options: any): string {
  throw new Error("Function not implemented.");
}
