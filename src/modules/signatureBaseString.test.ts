import signatureBaseString from "./signatureBaseString";

const method = "POST";
const url = "https://api.twitter.com/1.1/statuses/update.json";
const params = { include_entities: true };
const data = {
  status: "Hello Ladies + Gentlemen, a signed OAuth request!",
};
const oAuthOptions = {
  api_key: "xvz1evFS4wEEPTGEFPHBog",
  access_token: "370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb",
  oauth_nonce: "kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg",
  oauth_timestamp: 1318622958,
};

it("should return the parameter string", () => {
  expect(
    signatureBaseString({
      method,
      url,
      params,
      data,
      oAuthOptions,
    })
  ).toBe(
    "POST&https%3A%2F%2Fapi.twitter.com%2F1.1%2Fstatuses%2Fupdate.json&include_entities%3Dtrue%26oauth_consumer_key%3Dxvz1evFS4wEEPTGEFPHBog%26oauth_nonce%3DkYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1318622958%26oauth_token%3D370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb%26oauth_version%3D1.0%26status%3DHello%2520Ladies%2520%252B%2520Gentlemen%252C%2520a%2520signed%2520OAuth%2520request%2521"
  );
});
