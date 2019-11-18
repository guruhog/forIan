module.exports = `
  extend type Query {    
    getSummary(from: Int, to: Int, year: Int): String
    getAppSummary(appId: ID, from: Int, to: Int, year: Int): String
  }
`;
