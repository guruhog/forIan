module.exports = `
  type DataSource {
    _id: ID
    createdAt: String
    type: String
    title: String
  }

  extend type Query {
    getDataSources: [DataSource]
  }

  extend type Mutation {
    deleteDataSource(id: ID): ID
    addDataSource(title: String, type: String) : DataSource
  }
`;
