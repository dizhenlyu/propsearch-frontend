import { useRouter } from "next/router";  
import Query from "../components/query";  
import GET_SINGLE_PROPERTY from "../apollo/queries/property/property";
import { compose } from "recompose";
import securePage from "../hocs/securePage";
import Link from '../src/Link';
import fetch from 'isomorphic-unfetch';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

});

const Property = props => {  
  const router = useRouter();

  const {
    estimates,
    property_id
  } = props;

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
                <p>Xome : {estimates[0]}</p>
                <p>Homes : {estimates[1]}</p>
                <p>Homefacts : {estimates[2]}</p>
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
  return {     
    estimates,
    property_id : req.query.id
  };
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
