const Sequelize = require("sequelize");
const databaseUrl = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/postgres";
//const db = new Sequelize(databaseUrl);
const db = {
  "use_env_variable": "DATABASE_URL",
  "dialectOptions": {
    "ssl": {
      "rejectUnauthorized": false
    }
  }
}

db.sync()
  .then(() => console.log("Database connected!"))
  .catch(console.error);

module.exports = db;
