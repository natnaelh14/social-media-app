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

export const QUERY_COMMENTS = gql`
  query getComments($post_id: ID!) {
    comments(post_id: $post_id) {
      id
      text
      user_id
      post_id
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
      avatar
      birth_date
      gender
      bio
      state
      city
      status
      country
      isActive
      updated_at
      created_at
    }
  }
`;

export const QUERY_USERS_LIST = gql`
  query getUsers($handle: String!) {
    usersList(handle: $handle) {
      id
      handle
      avatar
      isActive
    }
  }
`;

export const QUERY_CRYPTOS = gql`
  query getCryptos($user_id: ID!) {
    cryptoByUserId(user_id: $user_id) {
      id
      user_id
      crypto_name
      holding_amount
      purchase_date
    }
  }
`;

export const QUERY_FRIEND_REQUESTS = gql`
  query getFriendRequests($id: ID!) {
    friendRequests(id: $id) {
      id
      avatar
      handle
    }
  }
`;


export const QUERY_FOLLOWERS = gql`
  query getFollowers($id: ID!) {
    followers(id: $id) {
      id
      handle
      avatar
    }
  }
`;

export const QUERY_FOLLOWINGS = gql`
  query getFollowings($id: ID!) {
    followings(id: $id) {
      id
      handle
      avatar
    }
  }
`;