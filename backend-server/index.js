require('dotenv').config();
const { PORT, microServiceName } = require('./config');
const server = require('./libraries/server');
const dbServer = require('./libraries/dbPgConnect');

dbServer.sequelize.sync().then(() => {
  console.log(`${microServiceName} sequelize sync ready/done`);

  server(dbServer).then(res =>
    res.listen({ port: PORT }, () => {
      console.log(`${microServiceName} ready at port ${PORT}`);
    })
  );
});
