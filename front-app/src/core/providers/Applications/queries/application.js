import gql from 'graphql-tag';

const dictionaryFields = ['_id', 'title', 'type'];
const phasesFields = ['_id', 'title', 'active'];
const supportFields = ['title', 'content'];
const supportFiles = ['name', 'filename', 'extension'];
const contributorsFields = ['title', 'email', 'role'];

export const GET_APPLICATIONS_HOME = gql`
  query getApplicationsHome {
    getApplicationsHome {
      applications {
        _id
        title
        picture
        comments
        rating
        url
        targetAudience { ${dictionaryFields} }       
      }
      user {
        userRole {
          _id
        }
        userFunction {
          _id
        }
        applications {
          _id
          favorite
          isRated
        }        
      }
      userRatings {
        stars
        appId
      }
    }
  }
`;

export const GET_APPLICATIONS_DASHBOARD = gql`
  query getApplicationsDashBoard {
    getApplicationsDashBoard {
      _id
      title
      url
      picture
      currentVersion
      visible
    }
  }
`;

export const GET_APPLICATION_DASHBOARD_DETAILS = gql`
  query getApplication($appId: ID) {
    getApplication(appId: $appId) {
      _id
      title
      url
      provider
      currentVersion
      dataSources { ${dictionaryFields} }
      targetAudience { ${dictionaryFields} }
      releaseDate
      nextReleaseDate
      description
      whenToUse
      phases { ${phasesFields} }      
      contributors { ${contributorsFields} }
    }

    getSupport(appId: $appId) {
      access { ${supportFields} files { ${supportFiles}} }
      accessDescription { ${supportFields} files { ${supportFiles}} }
      training { ${supportFields} files { ${supportFiles}} }
      links { ${supportFields} files { ${supportFiles}} }
      contacts { ${supportFields} files { ${supportFiles}} }
      faqs { ${supportFields} files { ${supportFiles}} }
    }
  }
`;

export const GET_APPLICATION_DATA_HOME = gql`
  query getApplication($appId: ID) {
    getApplication(appId: $appId) {
      _id
      title
      picture
      url
      provider
      currentVersion
      rating
      dataSources { ${dictionaryFields} }
      targetAudience { ${dictionaryFields} }
      releaseDate
      nextReleaseDate
      description
      whenToUse
      phases { ${phasesFields} }
      contributors { ${contributorsFields} }
      comments
    }    
  }
`;

export const GET_UPLOAD_URL = gql`
  query getUploadUrl($appId: ID) {
    getUploadUrl(appId: $appId) {
      url
    }
  }
`;

export const GET_APPLICATION_SUPPORT = gql`
  query getSupport($appId: ID) {

    getApplication(appId: $appId) {
      _id
      title
      picture
      currentVersion
      releaseDate
      url
    }

    getSupport(appId: $appId) {
      access { ${supportFields} files { ${supportFiles}} }
      accessDescription { ${supportFields} files { ${supportFiles}} }
      training { ${supportFields} files { ${supportFiles}} }
      links { ${supportFields} files { ${supportFiles}} }
      contacts { ${supportFields} files { ${supportFiles}} }
      faqs { ${supportFields} files { ${supportFiles}} }
    }
  }
`;
