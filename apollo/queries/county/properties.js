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
      land_or_building
      auction_id
      min_bid
      xome_estimate
      homes_estimate
      homefacts_estimate
      average_estimate
      users_up_for_reviews {
        id
      }
      users_favorites {
        id
      }
    }
  }
}
`;
export default GET_COUNTY_PROPERTIES;  