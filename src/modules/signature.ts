import crypto from "crypto";
import { percentEncode } from "../helpers";
import {
  RequestOptions,
  BaseOAuthOptions,
  ExtendedOAuthOptions,
} from "../types";
import signatureBaseString from "./signatureBaseString";

export default function signature(
  options: RequestOptions & {
    oAuthOptions: BaseOAuthOptions & ExtendedOAuthOptions;
  }
): string {
  const baseString = signatureBaseString(options);
  const consumerSecret = percentEncode(options.oAuthOptions.api_secret_key);
  const tokenSecret = percentEncode(options.oAuthOptions.access_token_secret);
  const signingKey = `${consumerSecret}&${tokenSecret}`;
  const outputString = crypto
    .createHmac("sha1", signingKey)
    .update(baseString)
    .digest("base64");
  return outputString;
}
