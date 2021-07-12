/* eslint-disable no-console */
// https://developer.twitter.com/en/apps/
import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import oAuth1a from "../src/index";

const oAuthOptions = {
  api_key: process.env.TWITTER_API_KEY || "",
  api_secret_key: process.env.TWITTER_API_SECRET_KEY || "",
  access_token: process.env.TWITTER_ACCESS_TOKEN || "",
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || "",
};
const url = "https://api.twitter.com/1.1/favorites/create.json";
const method = "POST";
const params = {
  id: "1397568983931392004",
};

const authorization = oAuth1a(
  {
    method,
    url: url,
    params,
  },
  oAuthOptions
);

axios
  .post(url, undefined, {
    params,
    headers: {
      authorization,
    },
  })
  .then((data) => {
    return console.log(data);
  })
  .catch((err) => {
    if (err.response) {
      return console.log(err.response);
    }
    console.log(err);
  });
