import request from "supertest";
import app from "../index";
import Url from "../models/urlModel";

describe("URL Shortener API", () => {
  it("should create a short URL with a unique alias", async () => {
    const response = await request(app).post("/api/shorten").send({
      originalUrl: "https://example.com",
      alias: "my-alias",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("shortUrl");
    expect(response.body.shortUrl).toBe("my-alias");
  });

  it("should redirect to the original URL", async () => {
    const originalUrl = "https://example.com";
    const alias = "my-alias-2";
    await Url.create({ originalUrl, shortUrl: alias });

    const response = await request(app).get(`/api/${alias}`);

    expect(response.status).toBe(302);
    expect(response.header.location).toBe(originalUrl);
  });

  afterEach(async () => {
    await Url.deleteMany({});
  });
});
