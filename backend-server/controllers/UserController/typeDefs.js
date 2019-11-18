module.exports = `
  type User {
    _id: ID
    createdAt: String
    applications: [UserApplication]
    username: String
    fullname: String
    title: String
    email: String
    department: String
    country: String
    phone: String
    settings: String
    userRole: TargetAudience
    userFunction: TargetAudience
    ratings: [ID]
  }

  type UserApplication {
    _id: ID
    favorite: Boolean
    isRated: Boolean
  }

  type CurrentUser {
    user: User
    targetAudience: [TargetAudience]
    apps: Int
    ratings: Int
    comments: Int
  }

  extend type Query {
    getUsersCount: Int
    getUsers(searchTxt: String, perPage: Int): [User]
    getCurrentUser(userId: ID): CurrentUser
  }

  extend type Mutation {
    updateUser(appId: ID, action: Boolean): User
    saveUserProfile(userId: ID, userFunction: TargetAudienceInput, userRole: TargetAudienceInput): User
  }
`;
