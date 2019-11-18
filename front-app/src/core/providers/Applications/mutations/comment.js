import gql from 'graphql-tag';

export const ADD_COMMENT = gql`
  mutation addComment($appId: ID, $content: String, $createdAt: String, $commentType: String) {
    addComment(appId: $appId, content: $content, createdAt: $createdAt, commentType: $commentType) {
      _id
    }
  }
`;
