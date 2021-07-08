import oAuthV1Request from ".";

const oAuthOptions = {
  api_key: "xvz1evFS4wEEPTGEFPHBog",
  api_secret_key: "kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw",
  access_token: "370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb",
  access_token_secret: "LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE",
};
const baseURL = "https://api.twitter.com/1.1/search/tweets.json";
const params = { q: "twitter bot" };
const data = { status: "Hello World!" };
const expectedData = "status=Hello%20World%21";

it("should return the correct request with params", () => {
  const method = "GET";
  const request = oAuthV1Request({
    oAuthOptions,
    method,
    baseURL,
    params,
  });

  expect(request).toEqual({
    baseURL,
    method,
    params,
    data: "",
    headers: {
      "Content-Length": 0,
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: expect.stringContaining("OAuth"),
    },
  });
});

it("should return the correct request with body", () => {
  const method = "POST";
  const request = oAuthV1Request({
    oAuthOptions,
    method,
    baseURL,
    data,
  });
  expect(request).toEqual({
    baseURL,
    method,
    data: expectedData,
    params: {},
    headers: {
      "Content-Length": expectedData.length,
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: expect.stringContaining("OAuth"),
    },
  });
});

it("should return the correct request without body and params", () => {
  const method = "POST";
  const request = oAuthV1Request({
    oAuthOptions,
    method,
    baseURL,
  });
  expect(request).toEqual({
    baseURL,
    method,
    params: {},
    data: "",
    headers: {
      "Content-Length": 0,
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: expect.stringContaining("OAuth"),
    },
  });
});

it("should return the correct request with body and params", () => {
  const method = "POST";
  const request = oAuthV1Request({
    oAuthOptions,
    method,
    baseURL,
    params,
    data,
  });

  expect(request).toEqual({
    baseURL,
    method,
    params,
    data: expectedData,
    headers: {
      "Content-Length": expectedData.length,
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: expect.stringContaining("OAuth"),
    },
  });
});
