import gql from 'graphql-tag';

export const UPDATE_USER = gql`
  mutation updateUser($appId: ID, $action: Boolean) {
    updateUser(appId: $appId, action: $action) {
      _id
    }
  }
`;
