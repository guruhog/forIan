import gql from 'graphql-tag';

export const GET_DATASOURCES = gql`
  query getDataSources {
    getDataSources {
      _id
      title
      type
    }
  }
`;
