import { gql } from "@apollo/client";

export const UPDATE_USER_PROFILE = gql`
  mutation updateUserProfile(
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
    $created_at: Date!
    $updated_at: Date!
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
      created_at: $created_at
      updated_at: $updated_at
    ) {
      user 
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
