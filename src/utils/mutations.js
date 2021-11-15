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
    #add user mutation call.
    updateUserProfile(
      id: $id
      email: $email
      handle: $handle
      avatar: $avatar
      gender: $gender
      bio: $bio
      city: $city
      state: $state
      country: $country
      status: $status
      isActive: $isActive
      created_at: $created_at
      updated_at: $updated_at
    ) {
      user {
        id
        handle
        email
      }
    }
  }
`;
