module.exports = `
  type Phase {
    _id: ID
    createdAt: String
    type: String
    title: String
    active: Boolean
  }

  extend type Query {
    getPhases: [Phase]
  }

  extend type Mutation {
    deletePhase(id: ID): ID
    addPhase(title: String, type: String) : Phase
  }
`;
