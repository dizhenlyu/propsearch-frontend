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
import MaterialTable from 'material-table'

const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

const User = (props) => {  
  const router = useRouter();

  const {
    isAuthenticated
  } = props;

  const [state, setState] = React.useState({
    value: 0,
  });

  const columns = [
    { 
      title: 'Property Address', 
      field: 'property_address',
      render: rowData => <Link
        href={{
          pathname: "property",
          query: { id: rowData.id }
        }}
        as={`/property/${rowData.id}`}
      >
        <a>{rowData.property_address}</a>
      </Link>
    },
    { title: 'Property ID', field: 'property_id' },
    { title: 'Auction ID', field: 'auction_id' },
  ];

  const handleTabChange = (event, value) => {
    setState({ value });
  };

  const removePropertyFromFavorites = (user, property) => {
    user.favorites = user.favorites.filter( el => el.id !== property.id ); 
    strapi.updateEntry('users', user.id, user ).then(res => {
      alert("You removed " + property.property_address + " from Favorite list!");
      window.location.reload();
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
              <Tab label="Up for Review" />
              <Tab label="Favorite" />
              <Tab label="Site Investigation" />
              <Tab label="Up for Bidding" />
              <Tab label="Portfolio" />

            </Tabs>
            {state.value === 0 && <div>
              {/* <div>
                <MaterialTable
                  title='Up For Reviews'
                  columns={state.columns}
                  data={user.up_for_reviews}
                  options={{
                    exportButton: true
                  }}
                  actions={[
                    {
                      icon: 'delete',
                      tooltip: 'Remove Property',
                      onClick: (event, rowData) => removePropertyFromFavorites(user, rowData)
                    }
                  ]}
                />
              </div> */}
            </div>
            }
            {state.value === 1 && <div>
              <div>
                <MaterialTable
                  title='Favorites'
                  columns={columns}
                  data={user.favorites}
                  options={{
                    exportButton: true
                  }}
                  actions={[
                    {
                      icon: 'delete',
                      tooltip: 'Remove Property',
                      onClick: (event, rowData) => removePropertyFromFavorites(user, rowData)
                    }
                  ]}
                />
              </div>

              {/* <h2>Favorites</h2>
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
                ))} */}
              </div>
              }
              {state.value === 2 && <div>
                <h2>3</h2>
              </div>
              }
              {state.value === 3 && <div>
                <h2>4</h2>
              </div>
              }
              {state.value === 4 && <div>
                <h2>5</h2>
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