import gql from "graphql-tag";

const GET_SINGLE_PROPERTY = gql`  
  query Property($id: ID!) {  
    property(id: $id)  {
      id
      property_address
      property_id
      land_or_building
      auction_id
      photo_link
      owner_name
      county {
        id
        name
      }
    }
  }
`;

export default GET_SINGLE_PROPERTY;  