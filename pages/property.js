import { useRouter } from "next/router";  
import Query from "../components/query";  
import GET_SINGLE_PROPERTY from "../apollo/queries/property/property";
import { compose } from "recompose";
import securePage from "../hocs/securePage";
import Link from '../src/Link';
import fetch from 'isomorphic-unfetch';

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
          <p>{property.auction_id}</p>
          <Link
            href={property.photo_link}
          >
            <a>View on Google Map</a>
          </Link>
          <br />
          </>
        );
      }}
    </Query>
  );
};

Property.getInitialProps = async function() {
  const res = await fetch('http://localhost:3000/test');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.price}`);

  return {
    data: data
  };
};

export default securePage(Property);