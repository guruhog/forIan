import gql from 'graphql-tag';

export const DELETE_TARGETAUDIENCE = gql`
  mutation deleteTargetAudience($id: ID) {
    deleteTargetAudience(id: $id)
  }
`;

export const ADD_TARGETAUDIENCE = gql`
  mutation addTargetAudience($title: String, $type: String) {
    addTargetAudience(title: $title, type: $type) {
      _id
      title
      type
    }
  }
`;
