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
const baseURL = "https://api.twitter.com/1.1/search/tweets.json";
const method = "GET";
const params = { q: "twitter bot" };

const searchRequest = oAuthV1Headers({
  oAuthOptions,
  method,
  baseURL,
  params,
});

axios
  .request(searchRequest)
  .then(({ data }) => console.log(data))
  .catch((err) => {
    if (err.response) {
      return console.log(err.response);
    }
    console.log(err);
  });
