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

const baseUrl = "https://api.twitter.com/1.1/statuses/update.json";
const requestMethod = "POST";
const bodyParams = { status: "Hello World!" };

const auth = oAuthV1Headers({
  oAuthOptions,
  requestMethod,
  baseUrl,
  bodyParams,
});

axios
  .request({
    method: requestMethod,
    baseURL: baseUrl,
    headers: auth.headers,
    data: auth.body,
  })
  .then((data) => console.log(data))
  .catch((err) => {
    if (err.response) {
      console.log(err.response);
      return console.log(err.response.data.errors);
    }
    console.log(err);
  });
