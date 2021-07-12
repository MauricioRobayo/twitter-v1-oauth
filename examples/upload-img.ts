/* eslint-disable no-console */
// https://developer.twitter.com/en/apps/
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import axios from "axios";
import { authHeader, encode } from "./authHeader";

dotenv.config();

const imagePath = path.join(__dirname, "./cat.jpg");
const b64content = fs.readFileSync(imagePath, { encoding: "base64" });

const method = "POST";
const url = "https://upload.twitter.com/1.1/media/upload.json";
const data = { media_data: b64content };

axios
  .post(url, encode(data), {
    headers: {
      authorization: authHeader({
        method,
        url,
        data,
      }),
    },
  })
  .then(({ data: uploadedData }) => {
    const method = "POST";
    const url = "https://api.twitter.com/1.1/statuses/update.json";
    const data = {
      status: "Hello World IND SIG!",
      media_ids: uploadedData.media_id_string,
    };

    return axios.post(url, encode(data), {
      headers: {
        authorization: authHeader({
          method,
          url,
          data,
        }),
      },
    });
  })
  .then((data) => console.log(data))
  .catch((err) => {
    if (err.response) {
      return console.log(err.response);
    }
    console.log(err);
  });
