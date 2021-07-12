/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
// https://developer.twitter.com/en/apps/
import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import oAuth1a, { encode } from "../src/index";

const url = "https://api.twitter.com/1.1/statuses/update.json";
const method = "POST";
const data = { status: "Hello World!" };
const oAuthOptions = {
  api_key: process.env.TWITTER_API_KEY || "",
  api_secret_key: process.env.TWITTER_API_SECRET_KEY || "",
  access_token: process.env.TWITTER_ACCESS_TOKEN || "",
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || "",
};
const authorization = oAuth1a({ url, method, data }, oAuthOptions);

axios
  .post(url, encode(data), {
    headers: {
      authorization,
    },
  })
  .then((data) => console.log(data))
  .catch((err) => {
    if (err.response) {
      return console.log(err.response.data.errors);
    }
    console.log(err);
  });
