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
  setUpDataBase,
  playerTwelveObjectID,
} = require("./utils/db");
const Players = require("../src/mongoose/models/players");

afterAll((done) => {
  mongoose.disconnect();
  done();
});

beforeEach(setUpDataBase);

describe("Players tests", () => {
  //Creating a new player
  test("Creating a new player", async () => {
    const response = await request(app)
      .post("/players/register")
      .set("Authorization", `Bearer ${teamOne.tokens[0].token}`)
      .send({
        name: "Jeje",
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

  //creating a player with default value false
  test("Creating a player with false in team eleven", async () => {
    const response = await request(app)
      .post("/players/register")
      .set("Authorization", `Bearer ${teamOne.tokens[0].token}`)
      .send({
        name: "Jeje",
        age: 29,
        noOfMatches: 171,
        goalsScored: 59,
        type: "Forwarder",
      })
      .expect(201);
    const player = await Players.findById(response.body._id);
    expect(player.inEleven).toBe(false);
  });

  // viewing the players
  test("Viewing players of a team", async () => {
    const response = await request(app)
      .get("/players/view")
      .set("Authorization", `Bearer ${teamOne.tokens[0].token}`)
      .expect(200);
    expect(response.body.length).toBe(12);
  });

  //updating a player
  test("Updating a player", async () => {
    await request(app)
      .patch(`/players/update/${playerTwelveObjectID}`)
      .set("Authorization", `Bearer ${teamOne.tokens[0].token}`)
      .send({
        age: 22,
      })
      .expect(200);
    const player = await Players.findById(playerTwelveObjectID);
    expect(player.age).toBe(22);
  });

  //Not letting other teams to update some other team players
  test("Invalid update", async () => {
    await request(app)
      .patch(`/players/update/${playerTwelveObjectID}`)
      .set("Authorization", `Bearer ${teamTwo.tokens[0].token}`)
      .send({
        age: 30,
      })
      .expect(400);
  });

  //deleting a player of a team
  test("Delete a single player of a team", async () => {
    await request(app)
      .delete(`/players/delete/${playerTwelveObjectID}`)
      .set("Authorization", `Bearer ${teamOne.tokens[0].token}`)
      .send()
      .expect(200);
    const player = await Players.findById(playerTwelveObjectID);
    expect(player).toBeNull();
  });

  //Not letting other teams to delete players of some other teams
  test("Invalid deletion", async () => {
    await request(app)
      .delete(`/players/delete/${playerTwelveObjectID}`)
      .set("Authorization", `Bearer ${teamTwo.tokens[0].token}`)
      .send()
      .expect(400);
  });

  //Deleting all the player of a team
  test("Delete all players of a team", async () => {
    await request(app)
      .delete("/players/deleteAll")
      .set("Authorization", `Bearer ${teamTwo.tokens[0].token}`)
      .expect(200);
    const players = await Players.find({ belongsTo: teamTwoID });
    expect(players.length).toBe(0);
  });
});
