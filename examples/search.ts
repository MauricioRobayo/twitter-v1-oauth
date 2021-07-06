/* eslint-disable no-console */
// https://developer.twitter.com/en/apps/
import dotenv from "dotenv";
import oAuthV1Headers from "../src/index";
import { BaseOAuthOptions } from "../src/types";
import axios from "axios";

dotenv.config();

const oAuthOptions: BaseOAuthOptions = {
  api_key: process.env.TWITTER_API_KEY || "",
  api_secret_key: process.env.TWITTER_API_SECRET_KEY || "",
  access_token: process.env.TWITTER_ACCESS_TOKEN || "",
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || "",
};

const baseUrl = "https://api.twitter.com/1.1/search/tweets.json";
const requestMethod = "GET";
const queryParams = { q: "twitter bot" };

const headers = oAuthV1Headers({
  oAuthOptions,
  requestMethod,
  baseUrl,
  queryParams: { q: "twitter bot" },
});

axios
  .request({
    method: requestMethod,
    baseURL: baseUrl,
    params: queryParams,
    headers,
  })
  .then(({ data }) => console.log(data))
  .catch((err) => console.log(err.response.data.errors));
