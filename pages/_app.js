import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from "@apollo/react-hooks";  
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import withData from "../utils/apollo";

class MyApp extends App {

  constructor(props) {
    super(props);
  }
  
  getInitialProps = async ({ Component, router, ctx, apollo }) => {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <React.Fragment>
        <ApolloProvider client={apollo}>
          <Head>
            <title>My page</title>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </React.Fragment>
    );
  }
}
export default withData(MyApp);