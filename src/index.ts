import qs from "querystring";
import authorization from "./authorization/authorization";
import { percentEncode } from "./authorization/helpers";
import { AuthorizationOptions } from "./types";

function buildBody(
  bodyParams: Record<string, string | number | boolean>
): string {
  return qs.stringify(bodyParams, "&", "=", {
    encodeURIComponent: percentEncode,
  });
}

export default function oAuthV1Request({
  baseURL,
  method,
  params = {},
  data = {},
  oAuthOptions,
}: AuthorizationOptions): {
  method: "GET" | "PUT" | "POST" | "DELETE";
  baseURL: string;
  params: Record<string, string>;
  data: string;
  headers: {
    Authorization: string;
    "Content-Type": "application/x-www-form-urlencoded";
    "Content-Length": number;
  };
} {
  const stringData = buildBody(data);
  return {
    baseURL,
    method,
    params,
    data: stringData,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(stringData),
      Authorization: authorization({
        baseURL,
        method,
        params,
        data,
        oAuthOptions,
      }),
    },
  };
}
