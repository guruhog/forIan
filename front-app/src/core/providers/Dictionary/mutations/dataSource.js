import gql from 'graphql-tag';

export const DELETE_DATASOURCE = gql`
  mutation deleteDataSource($id: ID) {
    deleteDataSource(id: $id)
  }
`;

export const ADD_DATASOURCE = gql`
  mutation addDataSource($title: String, $type: String) {
    addDataSource(title: $title, type: $type) {
      _id
      title
      type
    }
  }
`;
