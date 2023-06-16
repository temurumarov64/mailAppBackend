const express = require("express");
const app = express();
const port = process.env.PORT || 4200;
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const mailingHandler = require("./handlers/mailing");
const db = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7626609",
  password: "YP3N77Rn1V",
  database: "sql7626609",
});

db.connect();

app.use(cors());

app.use(cookieParser());

app.use(bodyParser.json());

app.use(mailingHandler(db));

app.get("/", (req, res) => {
  res.send(`Hello World! ${JSON.stringify(req.cookies)}`);
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
