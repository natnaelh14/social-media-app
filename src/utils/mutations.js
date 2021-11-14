import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        handle
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $email: String!
    $password: String!
    $handle: String!
    $avatar: String!
    $gender: Gender!
    $birth_date: Date!
    $bio: String
    $city: String
    $state: String
    $country: String
    $status: MoodStatus
    $isActive: Boolean!
    $created_at: Date!
    $updated_at: Date!
  ) {
    #add user mutation call.
    addUser(
        email: $email
        password: $password
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
      token
      user {
        id
        handle
      }
    }
  }
`;