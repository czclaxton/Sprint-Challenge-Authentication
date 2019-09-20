const request = require("supertest");
const router = require("../jokes/jokes-router");
const axios = require("axios");

describe("jokes route", () => {
  it("should return a 200", () => {
    request(router)
      .get("/")
      .then(response => {
        expect(response.status).toBe(200);
      });
  });

  it("should return a joke", () => {
    request(router)
      .get("/")
      .then(response => {
        expect(response.data.results[0].id).toMatch(/"0189hNRf2g"/);
      });
  });
});
