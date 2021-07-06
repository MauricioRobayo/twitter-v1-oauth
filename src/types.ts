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
  baseUrl: string;
  subdomain?: string;
  requestMethod: "GET" | "POST" | "PUT" | "DELETE";
  queryParams?: Record<string, string>;
  bodyParams?: Record<string, string | number | boolean>;
};

export type AuthorizationOptions = RequestOptions & {
  oAuthOptions: BaseOAuthOptions;
};

export type Authorization = {
  body: string;
  headers: {
    Authorization: string;
    "Content-Type": "application/x-www-form-urlencoded";
    "Content-Length": number;
  };
};
