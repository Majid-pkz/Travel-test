import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
          firstname
          lastname
          email
          _id
        }
      }
    
  }
`;
export const CREATE_USER = gql`
  mutation createUser(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        firstname
      }
    }
  }
`;

// createUser(firstname: $firstname, lastname: $lastname, email: $email, password: $password) {
//   user {
//     firstname
//   }
//   token
// }
// }

export const CREATE_PROFILE = gql`
mutation createProfile($profileUser: ID!, $location: String, $joinedDate: String, $gender: String, $age: Int, $bio: String, $interests: [ID], $image: String, $verified: Boolean, $subscribed: Boolean, $createdTrips: ID, $tripCount: Int) {
  createProfile(profileUser: $profileUser, location: $location, joinedDate: $joinedDate, gender: $gender, age: $age, bio: $bio, interests: $interests, image: $image, verified: $verified, subscribed: $subscribed, createdTrips: $createdTrips, tripCount: $tripCount) {
    _id
    profileUser {
      _id
      firstname
      lastname
      email
    }
    location
    joinedDate
    gender
    age
    bio
    interests {
      _id
      label
    }
    image
    verified
    subscribed
    createdTrips {
      title
    }
    tripCount
  }
}
`;

export const CREATE_TRIP = gql`
  mutation createTrip(
    $creator: ID!
    $title: String!
    $description: String!
    $departureLocation: String!
    $destination: String!
    $startDate: String
    $endDate: String
  ) {
    createTrip(
      creator: $creator
      title: $title
      description: $description
      departureLocation: $departureLocation
      destination: $destination
      startDate: $startDate
      endDate: $endDate
    ) {
      
      title
      travelmates {
        email
      }
      tripType {
        tripType
      }
    }
  }
`;

export const JOIN_TRIP = gql`
mutation joinTrip($joinTripId: ID!, $userJoining: ID!) {
  joinTrip(id: $joinTripId, userJoining: $userJoining) {
    _id
    creator {
      _id
      firstname
      lastname
      email
      password
      isAdmin
    }
    title
    description
    departureLocation
    destination
    startDate
    endDate
    tripType {
      _id
      tripType
    }
    meetupPoint
    approvedTrip
    published
    image
    travelmates {
      _id
      firstname
      lastname
      email
      password
      isAdmin
    }
  }
}
`;

export const UPDATE_PROFILE = gql`
mutation updateProfile($id: ID!, $location: String, $gender: String, $age: Int, $bio: String, $interests: [ID]) {
  updateProfile(id: $id, location: $location, gender: $gender, age: $age, bio: $bio, interests: $interests) {
    _id
    age
    bio
    createdTrips {
      title
    }
    gender
    image
    interests {
      label
    }
    location
  }
}
`;