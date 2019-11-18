require("dotenv").config();
const bodyParser = require("body-parser");
const PostgreSql = require("./libraries/dbPgConnect");
const { PORT, microServiceName } = require("./config");
const cors = require("cors");

const app = require("express")();

const Router = require("./router");

PostgreSql.sequelize.sync().then(() => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());

  app.use("/auth", Router(PostgreSql));

  app.listen(PORT, () =>
    console.log(`${microServiceName} started on port ${PORT}`)
  );
});
