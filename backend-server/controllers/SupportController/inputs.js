module.exports = `
  input SupportInput {
    access: SupportObject
    accessDescription: SupportObject
    training: SupportObject
    links: SupportObject
    contacts: SupportObject
    faqs: SupportObject
  }

  input SupportObject {
    title: String
    content: String
    files: [InputSupportFile]
    type: String
  }

  input InputSupportFile {
    name: String
    filename: String
    extension: String
  }
`;
