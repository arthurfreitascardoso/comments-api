const Sequelize = require("sequelize");
const db = require("../db");

const Comment = db.define("comment", {
  user: Sequelize.STRING,
  text: Sequelize.TEXT,
  
});

module.exports = Comment;
