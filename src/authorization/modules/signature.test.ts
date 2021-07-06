import signature from "./signature";

const requestMethod = "POST";
const baseUrl = "https://api.twitter.com/1.1/statuses/update.json";
const queryParams = { include_entities: "true" };
const bodyParams = {
  status: "Hello Ladies + Gentlemen, a signed OAuth request!",
};
const oAuthOptions = {
  api_key: "xvz1evFS4wEEPTGEFPHBog",
  api_secret_key: "kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw",
  access_token: "370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb",
  access_token_secret: "LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE",
  oauth_nonce: "kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg",
  oauth_timestamp: 1318622958,
};

it("should return the signature", () => {
  expect(
    signature({
      requestMethod,
      baseUrl,
      queryParams,
      bodyParams,
      oAuthOptions,
    })
  ).toBe("hCtSmYh+iHYCEqBWrE7C7hYmtUk=");
});
