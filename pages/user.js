import { useRouter } from "next/router";  
import Query from "../components/query";  
import GET_SINGLE_USER from "../apollo/queries/user/user";
import { compose } from "recompose";
import securePage from "../hocs/securePage";
import Link from '../src/Link';
import { useQuery } from "@apollo/react-hooks";
import Strapi from "strapi-sdk-javascript/build/main";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';

const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

const User = (props) => {  
  const router = useRouter();

  const {
    isAuthenticated
  } = props;

  const [state, setState] = React.useState({
    value: 0
  })

  const handleTabChange = (event, value) => {
    setState({ value });
  };

  const removePropertyFromFavorites = (user, pid) => {
    user.favorites = user.favorites.filter( el => el.id !== pid ); 
    strapi.updateEntry('users', user.id, user ).then(res => {
      
    });
    // console.log(user)
    // const data = {
    //       favorites : ['1', '2'],
    //     }
    // strapi.updateEntry('users', user.id, data ).then(res => {
      
    // });

  }; 

  return (
    <Query query={GET_SINGLE_USER} id={router.query.id}>
      {({ data: { user } }) => {
        return (
          <>
          <Paper>
            <h1>{user.username}</h1>
            <Tabs
              value={state.value}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Favorites" />
              <Tab label="Item Two" />
              <Tab label="Item Three" />
            </Tabs>
              {state.value === 0 && <div>
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
                </div>}
                {state.value === 1 && <div>
                  <h2>2</h2>
                  </div>
                }
            </Paper>
          </>
        );
      }}
    </Query>
  );
};

export default securePage(User);