import gql from 'graphql-tag';

export const ADD_RATING = gql`
  mutation addRating($appId: ID, $stars: Int, $createdAt: String, $update: Boolean) {
    addRating(appId: $appId, stars: $stars, createdAt: $createdAt, update: $update)
  }
`;
