module.exports = `
  type Rating {
    _id: ID
    createdAt: String
    stars: Int!   
    userId: ID
    appId: String!    
  }

  extend type Mutation {
    addRating(
      stars: Int          
      appId: ID
      createdAt: String
      update: Boolean
    ): Float
  }
`;
