import gql from 'graphql-tag';

export const DELETE_PHASE = gql`
  mutation deletePhase($id: ID) {
    deletePhase(id: $id)
  }
`;

export const ADD_PHASE = gql`
  mutation addPhase($title: String, $type: String) {
    addPhase(title: $title, type: $type) {
      _id
      title
      type
    }
  }
`;
