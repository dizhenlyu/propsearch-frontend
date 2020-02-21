import { useRouter } from "next/router";  
import Query from "../components/query";  
import GET_SINGLE_PROPERTY from "../apollo/queries/property/property";
import { compose } from "recompose";
import securePage from "../hocs/securePage";
import Link from '../src/Link';
import fetch from 'isomorphic-unfetch';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

const styles = theme => ({

});

const Property = props => {  
  const router = useRouter();

  const {
    estimates,
    average_estimate,
    property_id
  } = props;

  const formatCurrency = (number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number)
  }

  return (
    <Query query={GET_SINGLE_PROPERTY} id={property_id}>
      {({ data: { property } }) => {
        return (
          <>
          <Paper>
            <h1>{property.property_address}</h1>
            <p>{property.property_id}</p>
            <p>{property.auction_id}</p>
            {( estimates && 
              <>
                <p>Xome : {formatCurrency(estimates[0])}</p>
                <p>Homes : {formatCurrency(estimates[1])}</p>
                <p>Homefacts : {formatCurrency(estimates[2])}</p>
                <p>Average : {formatCurrency(average_estimate)}</p>
              </>
            )}

            <Link
              href={property.photo_link}
            >
              <a>View on Google Map</a>
            </Link>
          </Paper>
          <br />
          </>
        );
      }}
    </Query>
  );

};

Property.getInitialProps = async function(req) {
  const res = await fetch('http://localhost:3000/estimate/' + req.query.id);
  const estimates = await res.json();
  const property_id = req.query.id
  const average_estimate = parseInt(estimates.reduce( ( p, c ) => parseInt(p) + parseInt(c), 0 ) / estimates.length);

  const data = {
    xome_estimate : estimates[0],
    homes_estimate : estimates[1],
    homefacts_estimate : estimates[2],
    average_estimate : average_estimate
  }
  strapi.updateEntry('properties', property_id, data ).then(res => {

  });
  return {     
    estimates,
    average_estimate,
    property_id
  }
};

export default withStyles(styles, { withTheme: true })(Property);

// const Property = props => {  
//   const router = useRouter();

//   const {
//     estimates,
//     property_id
//   } = props;
//   console.log(props)
//   return (
//     <Query query={GET_SINGLE_PROPERTY} id={router.query.id}>
//       {({ data: { property } }) => {
//         return (
//           <>
//           <Paper>
//             <h1>{property.property_address}</h1>
//             <p>{property.property_id}</p>
//             <p>{property.auction_id}</p>
//             {( props.estimates && 
//               <p>{props.estimates[0]}</p>

//             )}

//             <Link
//               href={property.photo_link}
//             >
//               <a>View on Google Map</a>
//             </Link>
//           </Paper>
//           <br />
//           </>
//         );
//       }}
//     </Query>
//   );

// };

// Property.getInitialProps = async function(req) {
//   console.log(req)
//   const pageProps = await securePage.getInitialProps && securePage.getInitialProps(ctx);
//   const res = await fetch('http://localhost:3000/estimate/' + req.params.id);
//   const estimates = await res.json();
//   return {
//     ...pageProps,
//     estimates,
//     property_id : req.params.id
//   };
// };
// export default compose(securePage, withStyles(styles, { withTheme: true }))(Property);
