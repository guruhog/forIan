import gql from 'graphql-tag';

export const ADD_APPLICATION = gql`
  mutation insertApplication($inputData: ApplicationInput!) {
    insertApplication(inputData: $inputData) {
      _id
      title
      url
      picture
      currentVersion
    }
  }
`;

export const UPDATE_APPLICATION = gql`
  mutation updateApplication(
    $inputApplication: ApplicationInput
    $inputDataSources: [DataSourceInput]
    $inputTargetAudience: [TargetAudienceInput]
    $inputPhase: [PhaseInput]
    $appId: ID
    $inputSupport: SupportInput
    $inputContributors: [ApplicationContributors]
  ) {
    updateApplication(
      inputApplication: $inputApplication
      inputDataSources: $inputDataSources
      inputTargetAudience: $inputTargetAudience
      inputPhase: $inputPhase
      inputSupport: $inputSupport
      inputContributors: $inputContributors
      appId: $appId
    ) {
      _id
      title
      url
      picture
      targetAudience {
        _id
        title
        type
      }
    }
  }
`;

export const UPDATE_APP_WITH_IMAGE = gql`
  mutation updateAppWithImage($appId: ID, $imageUrl: String) {
    updateAppWithImage(appId: $appId, imageUrl: $imageUrl) {
      _id
    }
  }
`;

export const SHOW_HIDE_APP = gql`
  mutation showHideApp($appId: ID, $visible: Boolean) {
    showHideApp(appId: $appId, visible: $visible) {
      _id
      visible
      title
      picture
      comments
      rating
      url
      targetAudience {
        _id
        title
        type
      }
    }
  }
`;

export const DELETE_APP = gql`
  mutation deleteApplication($appId: ID) {
    deleteApplication(appId: $appId) {
      _id
    }
  }
`;

export const SAVE_CLICK_TROUGH = gql`
  mutation saveClickTrough(
    $appId: ID
    $createdAt: String
    $appName: String
    $url: String
    $ipAddress: String
    $navigator: String
  ) {
    saveClickTrough(
      appId: $appId
      createdAt: $createdAt
      appName: $appName
      url: $url
      ipAddress: $ipAddress
      navigator: $navigator
    )
  }
`;
