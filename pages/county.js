import { useRouter } from "next/router";  
import Query from "../components/query";  
import GET_COUNTY_PROPERTIES from "../apollo/queries/county/properties";
import { compose } from "recompose";
import securePage from "../hocs/securePage";
import Link from '../src/Link';
import MaterialTable from 'material-table'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  propertyTable: {
    marginTop: '32px'
  },

});

const County = (props) => {  
  const router = useRouter();

  const {
    isAuthenticated,
    classes
  } = props;

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
                    onClick: (event, rowData) => alert("You saved " + rowData.property_address)
                  },
                  {
                    icon: 'delete',
                    tooltip: 'Delete User',
                    onClick: (event, rowData) => confirm("You want to delete " + rowData.property_address)
                  }
                ]}
              />
            </div>
          </>
        );
      }}
    </Query>
  );
};

County.addToList = (listname, property) => {

}

export default compose(securePage, withStyles(styles, { withTheme: true }))(County);
