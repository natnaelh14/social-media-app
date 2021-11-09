import { gql } from "@apollo/client";

export const QUERY_POSTS = gql`
  query getPostList($postsUserId: ID!) {
    posts(user_id: $postsUserId) {
      id
      text
    }
  }
`;
