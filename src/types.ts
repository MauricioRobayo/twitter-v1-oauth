export type OAuthOptions = {
  api_key: string;
  api_secret_key: string;
  access_token: string;
  access_token_secret: string;
  oauth_nonce?: string;
  oauth_timestamp?: number;
};

export type Options = {
  baseUrl: string;
  oAuthOptions: OAuthOptions;
  subdomain?: string;
  endpoint: string;
  requestMethod: "GET" | "POST" | "PUT" | "DELETE";
  queryParams?: Record<string, string>;
  bodyParams?: Record<string, string | number | boolean>;
};

export type Authorization = {
  "Content-Type"?: string;
  "Content-Length"?: number;
  Authorization: string;
};
