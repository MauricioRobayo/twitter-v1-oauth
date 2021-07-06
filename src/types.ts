export type OAuthOptions = {
  api_key: string;
  api_secret_key: string;
  access_token: string;
  access_token_secret: string;
};

export type SignatureOAuthOptions = {
  oauth_nonce: string;
  oauth_timestamp: number;
};

export type RequestOptions = {
  baseUrl: string;
  subdomain?: string;
  requestMethod: "GET" | "POST" | "PUT" | "DELETE";
  queryParams?: Record<string, string>;
  bodyParams?: Record<string, string | number | boolean>;
};

export type AuthorizationOptions = RequestOptions & {
  oAuthOptions: OAuthOptions;
};

export type SignatureOptions = RequestOptions & {
  signatureOptions: OAuthOptions & SignatureOAuthOptions;
};

export type Authorization =
  | { Authorization: string }
  | {
      Authorization: string;
      "Content-Type": "application/x-www-form-urlencoded";
      "Content-Length": number;
    };