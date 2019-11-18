module.exports = `
  type Contributor {
    _id: ID
    createdAt: String
    type: String
    title: String
  }

  type ContributorUser {
    title: String
    email: String
  }

  extend type Query {
    getContributors: [Contributor]
  }

  extend type Mutation {
    deleteContributor(id: ID): ID
    addContributor(title: String, type: String) : Contributor
    searchContributors(search: String): [ContributorUser]
  }
`;
