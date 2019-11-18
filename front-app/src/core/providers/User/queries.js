import gql from 'graphql-tag';

export const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      fullname
      title
      email
      department
      country
      phone
    }
  }
`;

export const GET_USERS_COUNT = gql`
  query getUsersCount {
    getUsersCount
  }
`;

export const GET_CURRENT_USER = gql`
  query getCurrentUser($userId: ID) {
    getCurrentUser(userId: $userId) {
      apps
      comments
      ratings
      user {
        _id
        email
        phone
        country
        userRole {
          _id
          title
          type
        }
        userFunction {
          _id
          title
          type
        }
      }
      targetAudience {
        _id
        title
        type
      }
    }
  }
`;
