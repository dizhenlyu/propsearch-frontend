import { useRouter } from "next/router";  
import Query from "../components/query";  
import GET_COUNTY_PROPERTIES from "../apollo/queries/county/properties";
import { compose } from "recompose";
// import defaultPage from "../hocs/defaultPage";

const County = (props) => {  
  const router = useRouter();

  const {
    isAuthenticated
  } = props;

  const addItem = (item) => {
    context.addItem(item);
  }

  return (
    <Query query={GET_COUNTY_PROPERTIES} id={router.query.id}>
      {({ data: { county } }) => {
        return (
          <>
          <h1>{county.name}</h1>
              <div>
                {county.properties.map(res => (
                  <div>{res.property_address}</div>
                ))}
            </div>
          </>
        );
      }}
    </Query>
  );
};

// export default defaultPage(County);
export default County;