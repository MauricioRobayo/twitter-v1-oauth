# Twitter OAuth 1.0a 🔑

[![npm version](https://badge.fury.io/js/twitter-v1-oauth.svg)](https://www.npmjs.com/package/twitter-v1-oauth)
[![Build and Test](https://github.com/MauricioRobayo/twitter-v1-oauth/actions/workflows/main.yml/badge.svg)](https://github.com/MauricioRobayo/twitter-v1-oauth/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/MauricioRobayo/twitter-v1-oauth/branch/main/graph/badge.svg?token=M2SaEIeOtO)](https://codecov.io/gh/MauricioRobayo/twitter-v1-oauth)
[![CodeFactor](https://www.codefactor.io/repository/github/mauriciorobayo/twitter-v1-oauth/badge)](https://www.codefactor.io/repository/github/mauriciorobayo/twitter-v1-oauth)

Simple and minimalist module to generate oAuth1.0a authorization header for Twitter API v1.1 and V2.

```typescript
import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import oAuth1a from "twitter-v1-oauth";

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
```

No dependencies and super small: [![install size](https://packagephobia.now.sh/badge?p=twitter-v1-oauth)](https://packagephobia.now.sh/result?p=twitter-v1-oauth).

![twitter-v1-oauth](https://media.giphy.com/media/km2mais9qzYI/giphy.gif)

## Install

```shell
npm install twitter-v1-oauth
```

## Usage

Create an app and get your credentials, you will need:

- API KEY
- API SECRET KEY
- ACCESS TOKEN
- ACCESS TOKEN SECRET

Use your preferred library to send the request using the documented endpoints and parameters for the [twitter v1 API](https://developer.twitter.com/en/docs/basics/getting-started).

### Twitter API v1.1 vs V2

When making a post request to Twitter API v1.1, the data needs to be encoded and sent as `application/x-www-form-urlencoded`. The module exports an `encode` function that can be used to properly encode the body before it is send. Check [post-tweet](./examples/post-tweet.ts) for an example.

Whe making a post request to Twitter API v2, the data doesn't need to be encoded and must be sent as `application/json`. Check [like-v2](./examples/like-v2.ts) for an example.

### CommonJS

```js
const authRequest = require("twitter-v1-oauth").default;
```

### ES6 Modules

```js
import oAuthRequest from "twitter-v1-oauth";
```

### TypeScript

Type definitions are included.

## Examples

Check the [examples](./examples) directory for ideas on how to use it with [axios](https://github.com/axios/axios).

The [index.test.ts](./src/index.test.ts) file should also provide a good idea on its usage.

## Twitter documentation

- [Authentication](https://developer.twitter.com/en/docs/basics/authentication/overview/oauth)
- [Authorizing a request](https://developer.twitter.com/en/docs/basics/authentication/guides/authorizing-a-request.html)
- [Creating a signature](https://developer.twitter.com/en/docs/basics/authentication/guides/authorizing-a-request.html)

## License

[MIT](./LICENSE)
