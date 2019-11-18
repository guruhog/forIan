const _merge = require('lodash.merge');
const { makeExecutableSchema } = require('apollo-server-express');

const Query = `
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

/** Resolvers */
const ApplicationResolvers = require('../controllers/ApplicationController/resolvers');
const CommentResolvers = require('../controllers/CommentController/resolvers');
const RatingResolvers = require('../controllers/RatingController/resolvers');
const DataSourceResolvers = require('../controllers/DataSourceController/resolvers');
const TargetAudienceResolvers = require('../controllers/TargetAudienceController/resolvers');
const ContributorResolvers = require('../controllers/ContributorController/resolvers');
const UserResolvers = require('../controllers/UserController/resolvers');
const PhasesResolvers = require('../controllers/PhaseController/resolvers');
const InsightsResolvers = require('../controllers/InsightsController/resolvers');
const SupportResolvers = require('../controllers/SupportController/resolvers');

/** TypeDefs */
const ApplicationTypeDefs = require('../controllers/ApplicationController/typeDefs');
const CommentTypeDefs = require('../controllers/CommentController/typeDefs');
const RatingTypeDefs = require('../controllers/RatingController/typeDefs');
const DataSourceTypeDefs = require('../controllers/DataSourceController/typeDefs');
const TargetAudienceTypeDefs = require('../controllers/TargetAudienceController/typeDefs');
const ContributorTypeDefs = require('../controllers/ContributorController/typeDefs');
const UserTypeDefs = require('../controllers/UserController/typeDefs');
const PhaseTypeDefs = require('../controllers/PhaseController/typeDefs');
const InsightsypeDefs = require('../controllers/InsightsController/typeDefs');
const SupportTypeDefs = require('../controllers/SupportController/typeDefs');

/** Inputs */
const ApplicationInputs = require('../controllers/ApplicationController/inputs');
const DataSourceInputs = require('../controllers/DataSourceController/inputs');
const TargetAudienceInputs = require('../controllers/TargetAudienceController/inputs');
const PhaseInputs = require('../controllers/PhaseController/inputs');
const SupportInputs = require('../controllers/SupportController/inputs');

/** Merge Resolvers into one */
const resolvers = _merge(
  {},
  ApplicationResolvers,
  CommentResolvers,
  RatingResolvers,
  DataSourceResolvers,
  TargetAudienceResolvers,
  ContributorResolvers,
  UserResolvers,
  PhasesResolvers,
  InsightsResolvers,
  SupportResolvers
);

//merge everything to one schema
const schema = makeExecutableSchema({
  typeDefs: [
    Query,
    ApplicationTypeDefs,
    CommentTypeDefs,
    RatingTypeDefs,
    DataSourceTypeDefs,
    TargetAudienceTypeDefs,
    ContributorTypeDefs,
    UserTypeDefs,
    PhaseTypeDefs,

    ApplicationInputs,
    DataSourceInputs,
    TargetAudienceInputs,
    PhaseInputs,
    SupportInputs,

    InsightsypeDefs,
    SupportTypeDefs
  ],
  resolvers
});

module.exports = schema;
