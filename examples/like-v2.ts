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
const url = `https://api.twitter.com/2/users/${process.env.TWITTER_USER_ID}/likes`;
const method = "POST";
const data = {
  tweet_id: "1397568983931392004",
};

axios
  .post(url, data, {
    headers: {
      authorization: oAuth1a({ method, url }, oAuthOptions),
    },
  })
  .then((data) => {
    return console.log(data);
  })
  .catch((err) => {
    if (err.response) {
      return console.log(err.response.data);
    }
    console.log(err);
  });
