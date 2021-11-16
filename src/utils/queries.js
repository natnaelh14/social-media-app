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
  query getUser($id: ID!) {
    userProfile(id: $id) {
      id
      email
      handle
    }
  }
`;
