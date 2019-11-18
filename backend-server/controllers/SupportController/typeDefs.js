module.exports = `
  type Support {
    _id: Int    
    access: SupportField
    accessDescription: SupportField
    training: SupportField
    links: SupportField
    contacts: SupportField
    faqs: SupportField
    appId: ID
  }

  type SupportField {
    title: String
    content: String
    files: [SupportFile]
    type: String
  }

  type SupportFile {
    name: String
    filename: String
    extension: String
  }

  extend type Query {
    getSupport(appId: ID): Support
  }
`;
