module.exports = `
  type TargetAudience {
    _id: ID
    createdAt: String
    type: String
    title: String
  }

  extend type Query {
    getTargetAudience: [TargetAudience]
  }

  extend type Mutation {
    deleteTargetAudience(id: ID): ID
    addTargetAudience(title: String, type: String) : TargetAudience
  }
`;
