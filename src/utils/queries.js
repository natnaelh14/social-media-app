import { gql } from "@apollo/client";

export const QUERY_POSTS = gql`
  query getPosts($postsUserId: ID!) {
    posts(user_id: $postsUserId) {
      user_id
      text
    }
  }
`;

export const QUERY_USER = gql`
  query getUser($user_id: ID!) {
    userProfile(user_id: $user_id) {
      user_id
      email
      handle
    }
  }
`;
