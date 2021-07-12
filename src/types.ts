type Method = "GET" | "POST" | "PUT" | "DELETE";

export type OAuthOptions = {
  api_key: string;
  api_secret_key: string;
  access_token: string;
  access_token_secret: string;
};

export type ExtendedOAuthOptions = {
  oauth_nonce: string;
  oauth_timestamp: number;
};

export type SignatureOAuthOptions = Pick<
  OAuthOptions,
  "access_token" | "api_key"
> &
  ExtendedOAuthOptions;

export type RequestOptions = {
  url: string;
  method: Method;
  params?: Record<string, string>;
  data?: Record<string, string | number | boolean>;
};
