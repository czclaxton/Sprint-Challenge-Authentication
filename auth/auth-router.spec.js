const Users = require("./auth-model");
const db = require("../database/dbConfig");
const request = require("supertest");
const router = require("../auth/auth-router");

describe("server", () => {
  it("sets the environment to testing", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});

describe("register", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  describe("add()", () => {
    it("should add a new user", async () => {
      const userData = { username: "joe", password: "pass" };
      const user = await Users.add(userData);
      const users = await db("users");
      expect(users[0].username).toBe("joe");
    });
  });

  it("return a 201 status", () => {
    request(router)
      .post("/register")
      .send({ name: "bob", password: "pass" })
      .then(res => {
        expect(res.status).toBe(201);
      });
  });
});

describe("/login", () => {
  it("should return a 401", () => {
    request(router)
      .post("/login")
      .send({ name: "asdfasd", password: "asdfl" })
      .then(res => {
        expect(res.status).toBe(401);
      });
  });

  it("should return a 500", () => {
    request(router)
      .post("/login")
      .send({ nae: "asdfasd", password: "asdfl" })
      .then(res => {
        expect(res.status).toBe(500);
      });
  });
});
