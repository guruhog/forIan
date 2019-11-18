import gql from 'graphql-tag';

export const GET_COMMENTS = gql`
  query getComments($appId: ID) {
    getComments(appId: $appId) {
      _id
      content
      user {
        _id
        username
        fullname
      }
      createdAt
      type
    }
  }
`;
