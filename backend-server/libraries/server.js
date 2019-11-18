const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const { verifyToken } = require('../utils/token');

const app = require('express')();
const http = require('http');
const cors = require('cors');
const schema = require('./schema');
const bodyParser = require('body-parser');

const socketIoServer = require('./socketIoServer');

module.exports = async ({
  Application,
  DataSource,
  TargetAudience,
  Sequelize,
  sequelize,
  User,
  Phase,
  Contributor,
  Comment,
  Rating,
  Metrics,
  Support
}) => {
  /*
   * Cors */
  app.use(
    cors({
      origin: '*',
      credentials: true
    })
  );

  app.use(bodyParser.urlencoded({ limit: '5000mb', extended: true }));

  /** Http(s) Server */
  const httpServer = await http.Server(app);

  /** Socket IO Server */
  const ioConnection = await socketIoServer(httpServer);

  /** Apollo Server */
  const apolloServer = new ApolloServer({
    schema,
    context: function({ req }) {
      const token = req.headers.authorization || '';
      const decodedToken = verifyToken(token);

      if (!decodedToken) {
        throw new AuthenticationError();
      }

      return {
        Application,
        DataSource,
        TargetAudience,
        Contributor,
        User,
        Phase,
        Comment,
        Rating,
        Metrics,
        Support,
        Op: Sequelize.Op,
        sequelize,
        token: decodedToken,
        ioConnection
      };
    }
  });

  apolloServer.applyMiddleware({ app });

  return httpServer;
};
