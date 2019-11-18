import gql from 'graphql-tag';

export const GET_PHASES = gql`
  query getPhases {
    getPhases {
      _id
      type
      title
    }
  }
`;
