export type OAuthOptions = {
  api_key: string;
  api_secret_key: string;
  access_token: string;
  access_token_secret: string;
};

export type Options = {
  oAuthOptions: OAuthOptions;
  subdomain?: string;
  endpoint: string;
  requestMethod?: "GET" | "POST" | "PUT" | "DELETE";
  queryParams?: Record<string, string>;
  bodyParams?: Record<string, string | number | boolean>;
};

export type Authorization = {
  "Content-Type": string;
  "Content-Length": number;
  Authorization: string;
  "cache-control": string;
};
