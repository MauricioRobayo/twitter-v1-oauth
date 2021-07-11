import { SignatureOAuthOptions } from "../types";
import { percentEncode } from "../helpers";

function buildOutputString(
  params: Record<string, string | number | boolean>
): string {
  return Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${percentEncode(String(value))}`)
    .join("&");
}

export default function parameterString(
  signatureOptions: SignatureOAuthOptions,
  queryParams?: Record<string, string>,
  bodyParams?: Record<string, string | number | boolean>
): string {
  const params = {
    ...queryParams,
    ...bodyParams,
    oauth_consumer_key: signatureOptions.api_key,
    oauth_nonce: signatureOptions.oauth_nonce,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: signatureOptions.oauth_timestamp,
    oauth_token: signatureOptions.access_token,
    oauth_version: "1.0",
  };
  return buildOutputString(params);
}
