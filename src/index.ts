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

export default function oAuthV1Headers(
  options: Omit<AuthorizationOptions, "bodyParams">
): {
  Authorization: string;
};
export default function oAuthV1Headers(options: AuthorizationOptions): {
  body: string;
  headers: {
    Authorization: string;
    "Content-Type": "application/x-www-form-urlencoded";
    "Content-Length": number;
  };
};
export default function oAuthV1Headers(options: AuthorizationOptions):
  | { Authorization: string }
  | {
      body: string;
      headers: {
        Authorization: string;
        "Content-Type": "application/x-www-form-urlencoded";
        "Content-Length": number;
      };
    } {
  if (options.bodyParams) {
    const body = buildBody(options.bodyParams || {});
    return {
      body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(body),
        Authorization: authorization(options),
      },
    };
  }

  return {
    Authorization: authorization(options),
  };
}
