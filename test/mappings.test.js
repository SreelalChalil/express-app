const app = require("../src/app");
const request = require("supertest");
const mongoose = require("mongoose");
const { response } = require("express");
const Mappings = require("../src/mongoose/models/mappings");
const { admin, setUpDataBase, mappingsOneID } = require("./utils/db");

beforeEach(setUpDataBase);

afterAll((done) => {
  mongoose.disconnect();
  done();
});

describe("Mapping tests", () => {
  //viewing all the mappings
  test("View all the mappings", async () => {
    const response = await request(app).get("/mapping/view").expect(200);
    expect(response.body.length).toBe(3);
  });

  //updating a mapping
  test("Update mappings", async () => {
    await request(app)
      .patch(`/mapping/update/${mappingsOneID}`)
      .set("Authorization", `Bearer ${admin.tokens[0].token}`)
      .send({
        name: "India",
      })
      .expect(200);
    const mapping = await Mappings.findById(mappingsOneID);
    expect(mapping.name).toBe("India");
  });
});
