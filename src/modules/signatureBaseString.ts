import { RequestOptions, SignatureOAuthOptions } from "../types";
import { percentEncode } from "../helpers";
import parameterString from "./parameterString";

export default function signatureBaseString({
  method,
  url,
  params,
  data,
  oAuthOptions,
}: RequestOptions & {
  oAuthOptions: SignatureOAuthOptions;
}): string {
  const paramString = parameterString(oAuthOptions, params, data);
  return `${method.toUpperCase()}&${percentEncode(url)}&${percentEncode(
    paramString
  )}`;
}
