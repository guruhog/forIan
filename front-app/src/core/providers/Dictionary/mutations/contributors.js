import gql from 'graphql-tag';

export const DELETE_CONTRIBUTOR = gql`
  mutation deleteContributor($id: ID) {
    deleteContributor(id: $id)
  }
`;

export const ADD_CONTRIBUTOR = gql`
  mutation addContributor($title: String, $type: String) {
    addContributor(title: $title, type: $type) {
      _id
      title
      type
    }
  }
`;

export const SEARCH_CONTRIBUTORS = gql`
  mutation searchContributors($search: String) {
    searchContributors(search: $search) {
      title
      email
    }
  }
`;
