/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
// https://developer.twitter.com/en/apps/
import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import oAuth1a from "../lib";

const oAuthOptions = {
  api_key: process.env.TWITTER_API_KEY || "",
  api_secret_key: process.env.TWITTER_API_SECRET_KEY || "",
  access_token: process.env.TWITTER_ACCESS_TOKEN || "",
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || "",
};
const url = "https://api.twitter.com/1.1/search/tweets.json";
const method = "GET";
const params = { q: "twitter bot" };

const authorization = oAuth1a({ method, url, params }, oAuthOptions);

axios
  .get(url, {
    params,
    headers: {
      authorization,
    },
  })
  .then(({ data }) => console.log(data))
  .catch((err) => {
    if (err.response) {
      return console.log(err.response.data.errors);
    }
    console.log(err);
  });
