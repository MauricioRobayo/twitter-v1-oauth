export type BaseOAuthOptions = {
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
  BaseOAuthOptions,
  "access_token" | "api_key"
> &
  ExtendedOAuthOptions;

export type RequestOptions = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  params?: Record<string, string>;
  data?: Record<string, string | number | boolean>;
};

export type AuthorizationOptions = RequestOptions & {
  oAuthOptions: BaseOAuthOptions;
};
