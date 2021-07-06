import crypto from "crypto";
import { percentEncode } from "../helpers";
import { SignatureOptions } from "../../types";
import signatureBaseString from "./signatureBaseString";

export default function signature(options: SignatureOptions): string {
  const baseString = signatureBaseString(options);
  const consumerSecret = percentEncode(options.signatureOptions.api_secret_key);
  const tokenSecret = percentEncode(
    options.signatureOptions.access_token_secret
  );
  const signingKey = `${consumerSecret}&${tokenSecret}`;
  const outputString = crypto
    .createHmac("sha1", signingKey)
    .update(baseString)
    .digest("base64");
  return outputString;
}
