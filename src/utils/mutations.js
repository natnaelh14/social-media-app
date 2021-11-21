import { gql } from "@apollo/client";

export const UPDATE_USER_PROFILE = gql`
  mutation updateProfile(
    $id: ID!
    $email: String!
    $handle: String!
    $avatar: String
    $gender: Gender
    $birth_date: Date
    $bio: String
    $city: String
    $state: String
    $country: String
    $status: MoodStatus
    $isActive: Boolean!
  ) {
    updateUserProfile(
      id: $id
      email: $email
      handle: $handle
      avatar: $avatar
      gender: $gender
      birth_date: $birth_date
      bio: $bio
      city: $city
      state: $state
      country: $country
      status: $status
      isActive: $isActive
    ) {
      id
      email
      handle
      avatar
      gender
      birth_date
      bio
      city
      state
      country
      status
      isActive
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($user_id: ID!, $text: String!) {
    addPost(user_id: $user_id, text: $text) {
      id
      text
      user_id
      created_at
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePostMutation($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addPostMutation($text: String!, $user_id: ID!, $post_id: ID!) {
    addComment(user_id: $user_id, post_id: $post_id, text: $text) {
      id
    }
  }
`;

export const ADD_CRYPTO = gql`
  mutation addCryptoMutation($cryptoName: String!, $holdingAmount: Int!, $userId: ID!) {
    addCrypto(crypto_name: $cryptoName, holding_amount: $holdingAmount, user_id: $userId) {
      id
      user_id
      crypto_name
      holding_amount
      purchase_date
    }
  }
`;