const app = require("../src/app");
const response = require("express");
const mongoose = require("mongoose");
const request = require("supertest");
const Admin = require("../src/mongoose/models/admin");
const Teams = require("../src/mongoose/models/teams");
const Players = require("../src/mongoose/models/players");
const {
  admin,
  teamOneID,
  teamOne,
  teamTwoID,
  adminObjectID,
  playerTwelveObjectID,
  setUpDataBase,
} = require("./utils/db");
const adminauth = require("../src/middlewares/adminauth");

beforeEach(setUpDataBase);

afterAll((done) => {
  mongoose.disconnect();
  done();
});

describe("Admin tests", () => {
  //logging in a valid admin
  test("Logging in valid admin", async () => {
    await request(app)
      .post("/login")
      .send({
        name: admin.name,
        password: admin.password,
      })
      .expect(200);
    const adminData = await Admin.findById(adminObjectID);
    expect(adminData.tokens.length).toBe(2);
  });

  //not letting to login if credentials were incorrect
  test("Not logging in with invalid credentials", async () => {
    await request(app)
      .post("/login")
      .send({
        name: admin.name,
        password: "DummyPAssword",
      })
      .expect(400);
  });

  //admin viewing all teams
  test("Admin viewing all the team details", async () => {
    const response = await request(app)
      .get("/admin/teams/view")
      .set("Authorization", `Bearer ${admin.tokens[0].token}`)
      .expect(200);
    expect(response.body.length).toBe(2);
  });

  //admin updating team details
  test("Admin updating team details", async () => {
    await request(app)
      .patch(`/admin/teams/update/${teamOneID}`)
      .set("Authorization", `Bearer ${admin.tokens[0].token}`)
      .send({
        coach: "Igor Stimac",
      })
      .expect(200);
    const team = await Teams.findById(teamOneID);
    expect(team.coach).toBe("Igor Stimac");
  });

  //getting the eleven of the team if combination is correct by admin
  test("Get the eleven of a team", async () => {
    const response = await request(app)
      .get(`/admin/teams/eleven/${teamOneID}`)
      .set("Authorization", `Bearer ${admin.tokens[0].token}`)
      .expect(200);
    expect(response.body.message).toBe("");
    expect(response.body.team11s.length).toBe(11);
  });

  //not getting eleven if combination meets the basic necessities by admin
  test("giving message if eleven not having the required combination", async () => {
    const response = await request(app)
      .get(`/admin/teams/eleven/${teamTwoID}`)
      .set("Authorization", `Bearer ${admin.tokens[0].token}`)
      .expect(200);
    expect(response.body.message).toBe(
      "Playing eleven does not meet the needed conditions"
    );
    expect(response.body.team11s.length).toBe(3);
  });

  //admin viewing the players of a team
  test("Viewing players of a team", async () => {
    const response = await request(app)
      .get(`/admin/players/view/${teamOneID}`)
      .set("Authorization", `Bearer ${admin.tokens[0].token}`)
      .expect(200);
    expect(response.body.length).toBe(12);
  });

  //admin adding a new player to a team
  test("Creating a new player", async () => {
    const response = await request(app)
      .post(`/admin/players/register/${teamOneID}`)
      .set("Authorization", `Bearer ${admin.tokens[0].token}`)
      .send({
        name: "Jeje Lalpecula",
        age: 29,
        noOfMatches: 171,
        goalsScored: 59,
        type: "Forwarder",
        inEleven: true,
      })
      .expect(201);
    const player = await Players.findById(response.body._id);
    expect(player).not.toBeNull();
  });

  //admin updating a player
  test("Admin updating a player details", async () => {
    await request(app)
      .patch(`/admin/players/update/${playerTwelveObjectID}`)
      .set("Authorization", `Bearer ${admin.tokens[0].token}`)
      .send({
        age: 22,
      })
      .expect(200);
    const player = await Players.findById(playerTwelveObjectID);
    expect(player.age).toBe(22);
  });

  //deleting a team along with its players
  test("Delete a team by admin", async () => {
    await request(app)
      .delete(`/admin/teams/delete/${teamOneID}`)
      .set("Authorization", `Bearer ${admin.tokens[0].token}`)
      .expect(200);
    const team = await Teams.findById(teamOneID);
    expect(team).toBeNull();
    const players = await Players.findOne({ belongsTo: teamOne._id });
    expect(players).toBeNull();
  });

  //Deleting the player of a team
  test("Delete a player by admin", async () => {
    await request(app)
      .delete(`/admin/players/delete/${playerTwelveObjectID}`)
      .set("Authorization", `Bearer ${admin.tokens[0].token}`)
      .expect(200);
    const player = await Players.findById(playerTwelveObjectID);
    expect(player).toBeNull();
  });

  //admin deleting all the palyers
  test("Delete all players", async () => {
    await request(app)
      .delete(`/admin/players/deleteAll/${teamOneID}`)
      .set("Authorization", `Bearer ${admin.tokens[0].token}`)
      .expect(200);
    const players = await Players.find({ belongsTo: teamOneID });
    expect(players.length).toBe(0);
  });
});
