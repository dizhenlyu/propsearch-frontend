import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Box, Container, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Link from "../src/Link";
import { unsetToken } from "../lib/auth";
import defaultPage from "../hocs/defaultPage";
import { compose } from "recompose";

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    flexGrow: 1,
    position: 'absolute',
    backgroundColor: 'yellow',
    boxShadow: 'none',
  },
  pageTitle: {
    flexGrow: 1,
    marginLeft: 0,
    fontSize: '1.4rem',
    fontWeight: 700,
  },
  child: {
    width: '100%',
    margin: '64px auto',
  }
});

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }
  static async getInitialProps({ req }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, isAuthenticated };
  }
  render() {
    const { classes, isAuthenticated, children } = this.props;

    return (
      <Box className={classes.root}>
        <AppBar 
          position="fixed"
          className={classes.appBar}
        >
          <Toolbar>
            <Link href='/'>
              <IconButton>
                <HomeIcon />
              </IconButton>
            </Link>
            <Typography 
              variant="h4" 
              className={classes.pageTitle} 
              color="primary"
            >
              Title
            </Typography>

            {isAuthenticated ? (
              <>
                <span style={{ color: "black", marginRight: 30 }}>
                  <AccountCircle />
                  {this.props.loggedUser}
                </span>
                <IconButton>
                  <FavoriteIcon />
                </IconButton>
                <Link href="/">
                  <a className="logout" onClick={unsetToken}>
                    Logout
                  </a>
                </Link>
              </>
            ) : (
              <>
                <Link href="/signin">
                  <a className="nav-link">Sign In</a>
                </Link>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Container className={classes.child}>
          {children}
        </Container>
      </Box>
    )
  }
}
export default compose(defaultPage, withStyles(styles, { withTheme: true }))(Layout);
