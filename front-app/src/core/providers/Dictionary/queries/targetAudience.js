import gql from 'graphql-tag';

export const GET_TARGETAUDIENCE = gql`
  query getTargetAudience {
    getTargetAudience {
      _id
      title
      type
    }
  }
`;
