import { useRouter } from "next/router";  
import Query from "../components/query";  
import GET_SINGLE_USER from "../apollo/queries/user/user";
import { compose } from "recompose";
import securePage from "../hocs/securePage";
import Link from '../src/Link';
import { useQuery } from "@apollo/react-hooks";
import Strapi from "strapi-sdk-javascript/build/main";

const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

const User = (props) => {  
  const router = useRouter();

  const {
    isAuthenticated
  } = props;

  const removePropertyFromFavorites = (user, pid) => {
    console.log(user);
    user.favorites = user.favorites.filter( el => el.id !== pid ); 
    console.log(user);
    strapi.updateEntry('users', user.id, user ).then(res => {
      
    });

  }; 

  return (
    <Query query={GET_SINGLE_USER} id={router.query.id}>
      {({ data: { user } }) => {
        return (
          <>
          <h1>{user.username}</h1>
          <div>
            <h2>Favorites</h2>
                {user.favorites.map(res => (
                  <div>
                    <div>{res.property_address}</div>
                    <Link
                      href={{
                        pathname: "property",
                        query: { id: res.id, address: res.property_address }
                      }}
                    >
                      <a>View</a>
                    </Link>
                    <button onClick={e => removePropertyFromFavorites(user, res.id)}>Remove</button>
                  </div>
                ))}
            </div>
          </>
        );
      }}
    </Query>
  );
};

export default securePage(User);