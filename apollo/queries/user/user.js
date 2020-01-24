import gql from "graphql-tag";

const GET_SINGLE_USER = gql`  
  query User($id: ID!) {  
    user(id: $id)  {
      id
      username
      favorites {
        id
        property_address
      }
    }
  }
`;

export default GET_SINGLE_USER;  