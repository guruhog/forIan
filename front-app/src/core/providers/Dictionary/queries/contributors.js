import gql from 'graphql-tag';

export const GET_CONTRIBUTORS = gql`
  query getContributors {
    getContributors {
      _id
      title
      type
    }
  }
`;
