import oAuthV1Request from ".";

const oAuthOptions = {
  api_key: "xvz1evFS4wEEPTGEFPHBog",
  api_secret_key: "kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw",
  access_token: "370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb",
  access_token_secret: "LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE",
};
const baseURL = "https://api.twitter.com/1.1/search/tweets.json";
describe("oAuthV1Headers", () => {
  it("should return the correct request with params", () => {
    const method = "GET";
    const params = { q: "twitter bot" };
    const searchRequest = oAuthV1Request({
      oAuthOptions,
      method,
      baseURL,
      params,
    });

    expect(searchRequest).toEqual({
      baseURL,
      method,
      params,
      headers: {
        Authorization: expect.stringContaining("OAuth"),
      },
    });
  });

  it("should return the correct request with body", () => {
    const method = "POST";
    const data = { status: "Hello World!" };
    const searchRequest = oAuthV1Request({
      oAuthOptions,
      method,
      baseURL,
      data,
    });
    const expectedData = "status=Hello%20World%21";
    expect(searchRequest).toEqual({
      baseURL,
      method,
      data: expectedData,
      headers: {
        "Content-Length": expectedData.length,
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: expect.stringContaining("OAuth"),
      },
    });
  });
});
