import gql from 'graphql-tag';

const GET_COUNTY_PROPERTIES = gql`
query County($id: ID!) {
  county(id: $id) {
    id
    name
    properties {
      id
      property_address
      property_id
      auction_id
      users_favorites {
        id
      }
    }
  }
}
`;
export default GET_COUNTY_PROPERTIES;  