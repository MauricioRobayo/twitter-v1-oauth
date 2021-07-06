import qs from "querystring";
import authorization from "./authorization/authorization";
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
  if (options.bodyParams) {
    const body = buildBody(options.bodyParams);
    return {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(body),
      Authorization: authorization(options),
    };
  }

  return {
    Authorization: authorization(options),
  };
}
