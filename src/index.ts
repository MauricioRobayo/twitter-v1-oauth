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
  options: Omit<AuthorizationOptions, "data">
): {
  method: "GET" | "PUT" | "POST" | "DELETE";
  baseURL: string;
  params: Record<string, string>;
  headers: {
    Authorization: string;
  };
};
export default function oAuthV1Headers(
  options: Omit<AuthorizationOptions, "params">
): {
  method: "GET" | "PUT" | "POST" | "DELETE";
  baseURL: string;
  data: string;
  headers: {
    Authorization: string;
    "Content-Type": "application/x-www-form-urlencoded";
    "Content-Length": number;
  };
};
export default function oAuthV1Headers(
  options: Omit<AuthorizationOptions, "params" | "data">
): {
  method: "GET" | "PUT" | "POST" | "DELETE";
  baseURL: string;
  headers: {
    Authorization: string;
  };
};
export default function oAuthV1Headers(options: AuthorizationOptions):
  | {
      method: "GET" | "PUT" | "POST" | "DELETE";
      baseURL: string;
      params: Record<string, string>;
      headers: {
        Authorization: string;
      };
    }
  | {
      method: "GET" | "PUT" | "POST" | "DELETE";
      baseURL: string;
      data: string;
      headers: {
        Authorization: string;
        "Content-Type": "application/x-www-form-urlencoded";
        "Content-Length": number;
      };
    }
  | {
      method: "GET" | "PUT" | "POST" | "DELETE";
      baseURL: string;
      headers: {
        Authorization: string;
      };
    } {
  if (options.data) {
    const data = buildBody(options.data || {});
    return {
      baseURL: options.baseURL,
      method: options.method,
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(data),
        Authorization: authorization(options),
      },
    };
  }

  if (options.params) {
    return {
      baseURL: options.baseURL,
      method: options.method,
      params: options.params,
      headers: {
        Authorization: authorization(options),
      },
    };
  }

  return {
    baseURL: options.baseURL,
    method: options.method,
    headers: {
      Authorization: authorization(options),
    },
  };
}
