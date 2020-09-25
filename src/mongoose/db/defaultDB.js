const mongoose = require("mongoose");
require("./mongoose");
const jwt = require("jsonwebtoken");
const Teams = require("../models/teams");
const Players = require("../models/players");
const Admin = require("../models/admin");
const Mappings = require("../models/mappings");

const teamOneID = new mongoose.Types.ObjectId();

const teamOne = {
  _id: teamOneID,
  name: "Fast Footers",
  password: "User1@333",
  country: "India",
  coach: "Ram",
  tokens: [
    {
      token: jwt.sign({ _id: teamOneID }, "ThisJwtTokenIsUsedToValidateTheUser"),
    },
  ],
};

const teamTwoID = new mongoose.Types.ObjectId();

const teamTwo = {
  _id: teamTwoID,
  name: "Fire Fighters",
  password: "User2@333",
  country: "America",
  coach: "Karthick",
  tokens: [
    {
      token: jwt.sign({ _id: teamTwoID }, "ThisJwtTokenIsUsedToValidateTheUser"),
    },
  ],
};

const playerOne = {
  _id: new mongoose.Types.ObjectId(),
  name: "Jeje",
  age: 29,
  noOfMatches: 171,
  goalsScored: 59,
  type: "Forwarder",
  inEleven: true,
  belongsTo: teamOneID,
};

const playerTwo = {
  _id: new mongoose.Types.ObjectId(),
  name: "Stiven Mendoza",
  age: 32,
  noOfMatches: 211,
  goalsScored: 89,
  type: "Forwarder",
  inEleven: true,
  belongsTo: teamOneID,
};

const playerThree = {
  _id: new mongoose.Types.ObjectId(),
  name: "Dhanachandra Singh",
  age: 26,
  noOfMatches: 136,
  goalsScored: 51,
  type: "Defender",
  inEleven: true,
  belongsTo: teamOneID,
};

const playerFour = {
  _id: new mongoose.Types.ObjectId(),
  name: "Abhishek Das",
  age: 35,
  noOfMatches: 115,
  goalsScored: 18,
  type: "Defender",
  inEleven: true,
  belongsTo: teamOneID,
};

const playerFive = {
  _id: new mongoose.Types.ObjectId(),
  name: "Maílson Alves",
  age: 28,
  noOfMatches: 165,
  goalsScored: 24,
  type: "Defender",
  inEleven: true,
  belongsTo: teamOneID,
};

const playerSix = {
  _id: new mongoose.Types.ObjectId(),
  name: "Jerry Lalrinzuala",
  age: 36,
  noOfMatches: 111,
  goalsScored: 14,
  type: "Defender",
  inEleven: true,
  belongsTo: teamOneID,
};

const playerSeven = {
  _id: new mongoose.Types.ObjectId(),
  name: "Laldinliana Renthlei",
  age: 23,
  noOfMatches: 76,
  goalsScored: 9,
  type: "Defender",
  inEleven: true,
  belongsTo: teamOneID,
};

const playerEight = {
  _id: new mongoose.Types.ObjectId(),
  name: "Elano",
  age: 30,
  noOfMatches: 167,
  goalsScored: 67,
  type: "Mid-Fielder",
  inEleven: true,
  belongsTo: teamOneID,
};

const playerNine = {
  _id: new mongoose.Types.ObjectId(),
  name: "Bruno Pelissari",
  age: 29,
  noOfMatches: 115,
  goalsScored: 46,
  type: "Mid-Fielder",
  inEleven: true,
  belongsTo: teamOneID,
};

const playerTen = {
  _id: new mongoose.Types.ObjectId(),
  name: "Dhanpal Ganesh",
  age: 23,
  noOfMatches: 89,
  goalsScored: 34,
  type: "Mid-Fielder",
  inEleven: true,
  belongsTo: teamOneID,
};

const playerEleven = {
  _id: new mongoose.Types.ObjectId(),
  name: "Karanjit Singh",
  age: 32,
  noOfMatches: 189,
  goalsScored: 14,
  type: "Goal Keeper",
  inEleven: true,
  belongsTo: teamOneID,
};

const playerTwelveObjectID = new mongoose.Types.ObjectId();

const playerTwelve = {
  _id: playerTwelveObjectID,
  name: "Karthick",
  age: 31,
  noOfMatches: 201,
  goalsScored: 87,
  type: "Forwarder",
  inEleven: false,
  belongsTo: teamOneID,
};

const playerThirteen = {
  _id: new mongoose.Types.ObjectId(),
  name: "Neymar",
  age: 29,
  noOfMatches: 161,
  goalsScored: 88,
  type: "Forwarder",
  inEleven: true,
  belongsTo: teamTwoID,
};

const playerFourteen = {
  _id: new mongoose.Types.ObjectId(),
  name: "Dani Alves",
  age: 35,
  noOfMatches: 221,
  goalsScored: 52,
  type: "Mid-Fielder",
  inEleven: true,
  belongsTo: teamTwoID,
};

const playerFifteen = {
  _id: new mongoose.Types.ObjectId(),
  name: "Tiago Silva",
  age: 34,
  noOfMatches: 141,
  goalsScored: 21,
  type: "Defender",
  inEleven: true,
  belongsTo: teamTwoID,
};

const playerSixteen = {
  _id: new mongoose.Types.ObjectId(),
  name: "Ivan Quarasma Da Silva",
  age: 22,
  noOfMatches: 54,
  goalsScored: 3,
  type: "Goal Keeper",
  inEleven: false,
  belongsTo: teamTwoID,
};

const adminObjectID = new mongoose.Types.ObjectId();

const admin = {
  _id: adminObjectID,
  name: "Admin",
  password: "Fresco@333",
  tokens: [
    {
      token: jwt.sign(
        { _id: adminObjectID },
        "ThisJwtTokenIsUsedToValidateTheUser"
      ),
    },
  ],
};

const mappingsOneID = new mongoose.Types.ObjectId();

const mappingsOne = {
  _id: mappingsOneID,
  category: "Semi-Final 1",
  name: "",
};

const mappingsTwo = {
  _id: new mongoose.Types.ObjectId(),
  category: "Semi-Final 2",
  name: "",
};

const mappingsThree = {
  _id: new mongoose.Types.ObjectId(),
  category: "Final",
  name: "",
};

const mappingsFour = {
  _id: new mongoose.Types.ObjectId(),
  category: "Team 1",
  name: "",
};

const mappingsFive = {
  _id: new mongoose.Types.ObjectId(),
  category: "Team 2",
  name: "",
};

const mappingsSix = {
  _id: new mongoose.Types.ObjectId(),
  category: "Team 3",
  name: "",
};

const mappingsSeven = {
  _id: new mongoose.Types.ObjectId(),
  category: "Team 4",
  name: "",
};

const setUpDataBase = async () => {
  await Teams.deleteMany();
  await Players.deleteMany();
  await Admin.deleteMany();
  await Mappings.deleteMany();
  await new Admin(admin).save();
  await new Teams(teamOne).save();
  await new Teams(teamTwo).save();
  await new Mappings(mappingsOne).save();
  await new Mappings(mappingsTwo).save();
  await new Mappings(mappingsThree).save();
  await new Mappings(mappingsFour).save();
  await new Mappings(mappingsFive).save();
  await new Mappings(mappingsSix).save();
  await new Mappings(mappingsSeven).save();
  await new Players(playerOne).save();
  await new Players(playerTwo).save();
  await new Players(playerThree).save();
  await new Players(playerFour).save();
  await new Players(playerFive).save();
  await new Players(playerSix).save();
  await new Players(playerSeven).save();
  await new Players(playerEight).save();
  await new Players(playerNine).save();
  await new Players(playerTen).save();
  await new Players(playerEleven).save();
  await new Players(playerTwelve).save();
  await new Players(playerThirteen).save();
  await new Players(playerFourteen).save();
  await new Players(playerFifteen).save();
  await new Players(playerSixteen).save();
};

setUpDataBase();