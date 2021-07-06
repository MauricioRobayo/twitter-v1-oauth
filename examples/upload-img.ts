/* eslint-disable no-console */
// https://developer.twitter.com/en/apps/
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import oAuthV1Headers from "../src/index";
import { BaseOAuthOptions } from "../src/types";
import axios from "axios";

dotenv.config();

const imagePath = path.join(__dirname, "./cat.jpg");
const b64content = fs.readFileSync(imagePath, { encoding: "base64" });

const oAuthOptions: BaseOAuthOptions = {
  api_key: process.env.TWITTER_API_KEY || "",
  api_secret_key: process.env.TWITTER_API_SECRET_KEY || "",
  access_token: process.env.TWITTER_ACCESS_TOKEN || "",
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || "",
};

const method = "POST";

const imgRequestOptions = oAuthV1Headers({
  oAuthOptions,
  method,
  baseURL: "https://upload.twitter.com/1.1/media/upload.json",
  data: { media_data: b64content },
});

axios
  .request(imgRequestOptions)
  .then(({ data }) => {
    const tweetRequestOptions = oAuthV1Headers({
      oAuthOptions,
      method,
      baseURL: "https://api.twitter.com/1.1/statuses/update.json",
      data: {
        status: "Hello World IND SIG!",
        media_ids: data.media_id_string,
      },
    });

    return axios.request(tweetRequestOptions);
  })
  .then((data) => console.log(data))
  .catch((err) => {
    if (err.response) {
      console.log(err.response);
      return console.log(err.response.data.errors);
    }
    console.log(err);
  });
