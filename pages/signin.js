import React from "react";

import defaultPage from "../hocs/defaultPage";
import { strapiLogin } from "../lib/auth";

import Router from "next/router";
import {
  Container,
  Button,
  Grid,
  TextField,
  Hidden
} from "@material-ui/core";
import Cookies from "js-cookie";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        password: ""
      },
      loading: false,
      error: ""
    };
  }
  componentDidMount() {
    if (this.props.isAuthenticated) {
      Router.push("/"); // redirect if you're already logged in
    }
  }

  onChange(propertyName, event) {
    const { data } = this.state;
    data[propertyName] = event.target.value;
    this.setState({ data });
  }
  onSubmit() {
    const {
      data: { email, username, password }
    } = this.state;
    const { context } = this.props;

    this.setState({ loading: true });

    strapiLogin(email, password).then(() => console.log(Cookies.get("user")));
  }
  render() {
    const { error } = this.state;
    return (
      <Container>
        <Grid container>
          <Grid item md={3} implementation="css" smDown component={Hidden} />


          <Grid item md={6} sm={12}>
            <div className="paper">
              <div className="header">
                <img src="https://strapi.io/assets/images/logo.png" />
              </div>
              <section className="wrapper">
                <div className="notification">{error}</div>
                <form>
                  <TextField
                    label="Email:"
                    onChange={this.onChange.bind(this, "email")}
                    type="email"
                    name="email"
                  >
                  </TextField>
                  <TextField 
                    label="Password:"
                    onChange={this.onChange.bind(this, "password")}
                    type="password"
                    name="password"
                  >
                  </TextField>
                  <Button
                    color="primary"
                    onClick={this.onSubmit.bind(this)}
                  >
                    Submit
                  </Button>
                </form>
              </section>
            </div>
          </Grid>
        </Grid>
        <style jsx>
          {`
            .paper {
              border: 1px solid lightgray;
              box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
                0px 1px 1px 0px rgba(0, 0, 0, 0.14),
                0px 2px 1px -1px rgba(0, 0, 0, 0.12);
              height: 440px;
              border-radius: 6px;
              margin-top: 90px;
            }
            .notification {
              color: #ab003c;
            }
            .header {
              width: 100%;
              height: 120px;
              background-color: #2196f3;
              margin-bottom: 30px;
              border-radius-top: 6px;
            }
            .wrapper {
              padding: 10px 30px 20px 30px !important;
            }
            a {
              color: blue !important;
            }
            img {
              margin: 15px 30px 10px 50px;
            }
          `}
        </style>
      </Container>
    );
  }
}
export default SignIn;