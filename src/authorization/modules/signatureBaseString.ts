import { RequestOptions, SignatureOAuthOptions } from "../../types";
import { percentEncode } from "../helpers";
import parameterString from "./parameterString";

export default function signatureBaseString({
  method,
  baseURL,
  params,
  data,
  oAuthOptions,
}: RequestOptions & {
  oAuthOptions: SignatureOAuthOptions;
}): string {
  /*
    1. Convert the HTTP Method to uppercase and set the output string equal to this value.
    2. Append the ‘&’ character to the output string.
    3. Percent encode the URL and append it to the output string.
    4. Append the ‘&’ character to the output string.
    5. Percent encode the parameter string and append it to the output string.
*/
  const paramString = parameterString(oAuthOptions, params, data);
  const outputString = `${method.toUpperCase()}&${percentEncode(
    baseURL
  )}&${percentEncode(paramString)}`;
  return outputString;
}
