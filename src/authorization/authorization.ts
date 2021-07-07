import { AuthorizationOptions } from "../types";
import { randomString, timestamp, percentEncode } from "./helpers";
import signature from "./modules/signature";

export default function authorization(options: AuthorizationOptions): string {
  const oAuthParams = {
    oauth_consumer_key: options.oAuthOptions.api_key,
    oauth_nonce: randomString(32),
    oauth_signature: "",
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: timestamp(),
    oauth_token: options.oAuthOptions.access_token,
    oauth_version: "1.0",
  };

  oAuthParams.oauth_signature = signature({
    ...options,
    oAuthOptions: { ...options.oAuthOptions, ...oAuthParams },
  });

  return `OAuth ${Object.entries(oAuthParams)
    .map(
      ([key, value]) =>
        `${percentEncode(key)}="${percentEncode(String(value))}"`
    )
    .join(", ")}`;
}
