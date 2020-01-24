import gql from "graphql-tag";

const UPDATE_SINGLE_USER = gql`  
  mutation ($authorId: ID!, $favorites: Property) {  
    updateUser(id: $id, favorites: $favorites)  {
      id
      username
      favorites {
        id
        property_address
      }
    }
  }
`;

export default UPDATE_SINGLE_USER;  