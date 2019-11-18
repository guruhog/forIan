module.exports = `
  type Comment {
    _id: ID
    createdAt: String   
    content: String
    user: User
    appId: ID   
    type: String
  }

  extend type Query {
    getComments(appId: ID): [Comment]
  }

  extend type Mutation {
    addComment(    
      content: String
      appId: ID   
      createdAt: String,
      commentType: String
    ): Comment 
  }
`;
