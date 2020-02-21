import { useRouter } from "next/router";  
import Query from "../components/query";  
import GET_COUNTY_PROPERTIES from "../apollo/queries/county/properties";
import { compose } from "recompose";
import securePage from "../hocs/securePage";
import Link from '../src/Link';
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

const styles = theme => ({
  propertyTable: {
    marginTop: '32px'
  },

});

const County = (props) => {  
  const router = useRouter();

  const {
    isAuthenticated,
    classes,
    loggedUser
  } = props;

  const [message, setMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    columns: [
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
    ]
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const addUserToPropertyUsersFavorites = (property) => {
    const user_added = property.users_favorites.map(a => a.userid)
    user_added.push(loggedUser.userid);
    const data = {
          users_favorites : user_added,
        }
    strapi.updateEntry('properties', property.id, data ).then(res => {
      setMessage("You saved " + property.property_address + " to Favorite list!")
      setOpen(true);
    });
  }; 

  return (
    <Query query={GET_COUNTY_PROPERTIES} id={router.query.id}>
      {({ data: { county } }) => {
        console.log(county.properties)
        return (
          <>
            <div                
              className={classes.propertyTable} 
            >
              <MaterialTable
                title={county.name}
                columns={state.columns}
                data={county.properties}
                options={{
                  exportButton: true
                }}
                actions={[
                  {
                    icon: 'save',
                    tooltip: 'Save User',
                    onClick: (event, rowData) => addUserToPropertyUsersFavorites(rowData)
                  }
                ]}
              />
            </div>
            <Snackbar 
              open={open} 
              autoHideDuration={6000} 
              onClose={handleClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
                {message}
              </MuiAlert>
            </Snackbar>
          </>
        );
      }}
    </Query>
  );
};

export default compose(securePage, withStyles(styles, { withTheme: true }))(County);
