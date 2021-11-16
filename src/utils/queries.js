import { gql } from "@apollo/client";

export const QUERY_POSTS = gql`
  query getPosts($user_id: ID!) {
    posts(user_id: $user_id) {
      id
      user_id
      text
      created_at
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
