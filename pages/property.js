import { useRouter } from "next/router";  
import Query from "../components/query";  
import GET_SINGLE_PROPERTY from "../apollo/queries/property/property";
import { compose } from "recompose";
import securePage from "../hocs/securePage";
import Link from '../src/Link';

const Property = (props) => {  
  const router = useRouter();

  const {
    isAuthenticated
  } = props;

  return (
    <Query query={GET_SINGLE_PROPERTY} id={router.query.id}>
      {({ data: { property } }) => {
        return (
          <>
          <h1>{property.property_address}</h1>
          <p>{property.property_id}</p>
          </>
        );
      }}
    </Query>
  );
};

export default securePage(Property);