import qs from "querystring";
import authorization from "./authorization/authorization";
import { percentEncode } from "./authorization/helpers";
import { AuthorizationOptions, Authorization } from "./types";

function buildBody(
  bodyParams: Record<string, string | number | boolean>
): string {
  return qs.stringify(bodyParams, "&", "=", {
    encodeURIComponent: percentEncode,
  });
}

export default function oAuthV1Headers(
  options: AuthorizationOptions
): Authorization {
  // if (options.bodyParams) {
  const body = buildBody(options.bodyParams || {});
  return {
    body,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(body),
      Authorization: authorization(options),
    },
  };
  // }

  // return {
  //   Authorization: authorization(options),
  // };
}
