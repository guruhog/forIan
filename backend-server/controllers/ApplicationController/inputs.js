module.exports = `
  input ApplicationInput {
    title: String!
    url: String!
    provider: String
    currentVersion: String!
    releaseDate: String!
    nextReleaseDate: String
    description: String
    whenToUse: String    
  }

  input ApplicationContributors {
    title: String
    role: String
    email: String
  }
`;
