import { gql } from "@apollo/client";

export const QUERY_POSTS = gql`
  query getPostList($postsUserId: ID!) {
    posts(user_id: $postsUserId) {
      id
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
