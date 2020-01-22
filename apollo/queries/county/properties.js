import gql from 'graphql-tag';

const GET_COUNTY_PROPERTIES = gql`
query County($id: ID!) {
  county(id: $id) {
    id
    name
    properties {
      id
      property_address
    }
  }
}
`;
export default GET_COUNTY_PROPERTIES;  