import qs from "querystring";
import { OAuthOptions, RequestOptions } from "./types";
import { randomString, timestamp, percentEncode } from "./helpers";
import signature from "./modules/signature";

export function encode(
  data: Record<string, string | number | boolean>
): string {
  return qs.stringify(data, "&", "=", {
    encodeURIComponent: percentEncode,
  });
}

export default function oAuth1a(
  requestOptions: RequestOptions,
  oAuthOptions: OAuthOptions
): string {
  const oAuthParams = {
    oauth_consumer_key: oAuthOptions.api_key,
    oauth_nonce: randomString(32),
    oauth_signature: "",
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: timestamp(),
    oauth_token: oAuthOptions.access_token,
    oauth_version: "1.0",
  };

  oAuthParams.oauth_signature = signature({
    ...requestOptions,
    oAuthOptions: { ...oAuthOptions, ...oAuthParams },
  });

  return `OAuth ${Object.entries(oAuthParams)
    .map(
      ([key, value]) =>
        `${percentEncode(key)}="${percentEncode(String(value))}"`
    )
    .join(", ")}`;
}
