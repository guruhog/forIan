module.exports = `
  type Application {
    _id: ID
    createdAt: String
    title: String!
    url: String!
    provider: String
    picture: String    
    currentVersion: String!
    releaseDate:  String!
    nextReleaseDate: String!
    description: String
    whenToUse: String  
    dataSources: [DataSource]
    targetAudience: [TargetAudience]
    comments: Int
    phases: [Phase]
    contributors: [ApplicationContributor]
    rating: Float
    support: Support
    visible: Boolean
  }

  type ApplicationContributor {
    title: String
    role: String
    email: String
  }
  
  type ApplicationWithUser {
    applications: [Application]
    user: User
    userRatings: [Rating]
  }

  extend type Query {
    getApplicationsDashBoard : [Application]
    getApplicationsHome: ApplicationWithUser
    getApplication(appId: ID): Application
  }

  
  extend type Mutation {

    ####### Insert New Application Mutation #######
      insertApplication(
        inputData: ApplicationInput
      ): Application      
    
    ####### Edit Application Mutation #######      
      updateApplication(
        inputApplication: ApplicationInput,
        inputDataSources: [DataSourceInput],
        inputTargetAudience: [TargetAudienceInput],
        inputPhase: [PhaseInput]
        inputSupport: SupportInput
        inputContributors: [ApplicationContributors]
        appId: ID        
      ): Application


      updateAppWithImage(appId: ID, imageUrl: String): Application

      showHideApp(appId: ID, visible: Boolean): Application

      deleteApplication(appId: ID): Application

      saveClickTrough(appId: ID, createdAt: String, appName: String, url: String, ipAddress: String, navigator: String): Boolean
  }
`;
