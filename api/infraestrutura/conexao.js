const mysql = require("mysql2");
require('dotenv').config()

const bdHost = process.env.DB_HOST
const bdPort = process.env.DB_PORT
const bdUser = process.env.DB_USER
const bdPassword = process.env.DB_PASSWORD
const bdSchema = process.env.DB_SCHEMA

const conexao = mysql.createConnection({
  host: bdHost,
  port: bdPort,
  user: bdUser,
  password: bdPassword,
  database: bdSchema,
});

module.exports = conexao;
