const request = require("supertest");
const { response } = require("express");
const mongoose = require("mongoose");
const Teams = require("../src/mongoose/models/teams");
const app = require("../src/app");
const {
  teamOne,
  teamTwo,
  teamOneID,
  teamTwoID,
  playerTwelveObjectID,
  setUpDataBase,
} = require("./utils/db");
const Players = require("../src/mongoose/models/players");


afterAll((done) => {
  mongoose.disconnect();
  done();
});

beforeEach(setUpDataBase);

describe("Teams tests", () => {
  //registering a user with valid details
  test("Creating a valid user", async () => {
    const response = await request(app)
      .post("/teams/registration")
      .send({
        name: "Chennayin FC",
        password: "Fresco0601!",
        country: "TamilNadu",
        coach: "OwenCoylce",
      })
      .expect(201);
    const team = await Teams.findById(response.body.team._id);
    expect(team).not.toBeNull();
    expect(response.body).toMatchObject({
      team: {
        name: "Chennayin FC",
        country: "TamilNadu",
        coach: "OwenCoylce",
      },
      token: team.tokens[0].token,
    });
    expect(team.password).not.toBe("Fresco0601");
  });

  //regsitering a user with invalid details
  test("Trying to regsiter a invalid user", async () => {
    await request(app)
      .post("/teams/registration")
      .send({
        name: "AA",
        password: "bbbb",
        country: "cc",
        coach: "dd",
      })
      .expect(400);
  });

  //view all teams
  test("fetching team details", async () => {
    const response = await request(app)
      .get("/teams/view")
      .set("Authorization", `Bearer ${teamTwo.tokens[0].token}`)
      .expect(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe("Fast Footers");
    expect(response.body[1].name).toBe("Fire Fighters");
  });

  //logging in a valid user
  test("Logging in a valid user", async () => {
    const response = await request(app)
      .post("/teams/login")
      .send({
        name: teamOne.name,
        password: teamOne.password,
      })
      .expect(200);
    const team = await Teams.findById(teamOne._id);
    expect(response.body.token).toBe(team.tokens[1].token);
  });

  //not logging in a invalid user
  test("Not letting a invalid user to login", async () => {
    await request(app)
      .post("/teams/login")
      .send({
        name: "Osama binladan",
        password: "puresoul",
      })
      .expect(400);
  });

  //updating a team details
  test("updating a user details", async () => {
    await request(app)
      .patch("/teams/update")
      .set("Authorization", `Bearer ${teamOne.tokens[0].token}`)
      .send({
        coach: "Indian Coach",
      })
      .expect(200);
    const team = await Teams.findById(teamOneID);
    expect(team.coach).toBe("Indian Coach");
  });

  //not updating a invalid update
  test("not updating in an invlaid update", async () => {
    await request(app)
      .patch("/teams/update")
      .set("Authorization", `Bearer ${teamOne.tokens[0].token}`)
      .send({
        age: 21,
      })
      .expect(400);
  });

  //getting the eleven of the team if combination is correct
  test("Get the eleven of a team", async () => {
    const response = await request(app)
      .get("/teams/eleven")
      .set("Authorization", `Bearer ${teamOne.tokens[0].token}`)
      .expect(200);
    expect(response.body.message).toBe("");
    expect(response.body.team11s.length).toBe(11);
  });

  //not getting eleven if combination meets the basic necessities
  test("giving message if eleven not having the required combination", async () => {
    const response = await request(app)
      .get("/teams/eleven")
      .set("Authorization", `Bearer ${teamTwo.tokens[0].token}`)
      .expect(200);
    expect(response.body.message).toBe(
      "Playing eleven does not meet the needed conditions"
    );
    expect(response.body.team11s.length).toBe(3);
  });

  //deleting a team from DB
  test("Delete a team", async () => {
    await request(app)
      .delete("/teams/delete")
      .set("Authorization", `Bearer ${teamOne.tokens[0].token}`)
      .expect(200);
    const team = await Teams.findById(teamOne._id);
    expect(team).toBeNull();
    const players = await Teams.find({ belongsTo: teamOneID });
    expect(players.length).toBe(0);
  });
});
