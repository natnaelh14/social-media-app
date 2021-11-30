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

export const QUERY_SEARCH_API = gql`
  query getCryptoSearchAPI($name: String!) {
    cryptoSearchAPI(name: $name) {
      name
      current_price
      image
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

export const QUERY_TWEETS = gql`
  query getTwitterSearch($keyword: String!) {
    twitterSearch(keyword: $keyword)
  }
`;

export const QUERY_MESSENGERS = gql`
  query getMessengers($id: ID!) {
    messengers(id: $id) {
      id
      handle
      avatar
    }
  }
`;

export const QUERY_MESSAGES = gql`
  query getMessages($sender_id: String!, $receiver_id: String!) {
    messages(sender_id: $sender_id, receiver_id: $receiver_id) {
      id
      text
      sender_id
      receiver_id
      isSeen
      sent_at
    }
  }
`;

export const QUERY_REACTIONS_BY_POST = gql`
  query getReactionsByPost($reaction_type: String!, $post_id: ID!) {
    reactionsByPost(reaction_type: $reaction_type, post_id: $post_id) {
      id
      reaction_type
      post_id
      user_id
    }
  }
`;

export const QUERY_REACTIONS_BY_COMMENT = gql`
  query getReactionsByComment($reaction_type: String!, $comment_id: ID!) {
    reactionsByComment(reaction_type: $reaction_type, comment_id: $comment_id) {
      id
      reaction_type
      comment_id
      user_id
    }
  }
`;

export const QUERY_REACTIONS_BY_USER_POST = gql`
  query getReactionsByPost($user_id: ID!, $post_id: ID!) {
    reactionsByUserAndPost(user_id: $user_id, post_id: $post_id) {
      id
      reaction_type
    }
  }
`;