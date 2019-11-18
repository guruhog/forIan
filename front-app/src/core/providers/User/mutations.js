import gql from 'graphql-tag';

export const SAVE_USER_PROFILE = gql`
  mutation saveUserProfile(
    $userId: ID
    $userFunction: TargetAudienceInput
    $userRole: TargetAudienceInput
  ) {
    saveUserProfile(userId: $userId, userFunction: $userFunction, userRole: $userRole) {
      _id
    }
  }
`;
