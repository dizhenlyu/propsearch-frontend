import { useRouter } from "next/router";  
import Query from "../components/query";  
import GET_COUNTY_PROPERTIES from "../apollo/queries/county/properties";
import { compose } from "recompose";
import securePage from "../hocs/securePage";
import Link from '../src/Link';

const County = (props) => {  
  const router = useRouter();

  const {
    isAuthenticated
  } = props;

  return (
    <Query query={GET_COUNTY_PROPERTIES} id={router.query.id}>
      {({ data: { county } }) => {
        return (
          <>
          <h1>{county.name}</h1>
              <div>
                {county.properties.map(res => (
                  <div>
                    <div>{res.property_address}</div>
                    <Link
                      href={{
                        pathname: "property",
                        query: { id: res.id, address: res.property_address }
                      }}
                      // as={`/property/${res.property_address}`}
                    >
                      <a>View</a>
                    </Link>
                  </div>
                ))}
            </div>
          </>
        );
      }}
    </Query>
  );
};

export default securePage(County);