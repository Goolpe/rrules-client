
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

const Auth = () => (
    <div>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle className="text-white ml-2" nav><i className={fakeAuth.isAuthenticated ? "fas fa-user-circle fa-2x" : "fab fa-expeditedssl fa-2x"}></i></DropdownToggle>
          <DropdownMenu  className="p-0">
            <AuthButton />
          </DropdownMenu>
        </UncontrolledDropdown>
    </div>
);

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthButton = withRouter(
    ({ history }) =>
      this.state.isAuthenticated ? (
        <p>
          Welcome!{" "}
          <button onClick={() => {this.signout(() => history.push("/auth"));}}>
            Sign out
          </button>
        </p>
      ) : (
      <p>You are not logged in. 
        <button onClick={() => {this.authenticate(() => history.push("/id"))}}>
            Sign in
          </button>
      </p>
      )
  );

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/auth",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default Auth;