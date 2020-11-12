import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import { Grid } from '@material-ui/core';
import './scss/App.scss';

// Page
import Home from './page/Home';
import Login from './page/Login';
import Register from './page/Register';
import Customers from './page/Customers';
import Contracter from './page/Contracter';
import Designer from './page/Designer';
import Plumber from './page/Plumber';
import DashBoard from './page/Dashboard';
import Shop from './page/Shop';
import SingleProducts from './page/SingleProduct';
import ProductsConfirm from './page/ProductConfirm';
import PlaceOrder from './page/PlaceOrder';
import Payment from './page/Payment';
import CompleteOrder from './page/CompeteOrder';
import PayOrder from './page/PayOrder';
import Profile from './page/Profile';
import OpenProject from './page/OpenProject';

import AddToCart from './components/AddToCart';
import OneCustomer from './components/OneCustomer';
import AddProject from './components/AddProject';

// Redux staff
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { getUserData, logOutUser } from './redux/actions/userAction';

// layout
import Navbar from './components/layout/Navbar';

const App = (props) => {
  const theme = createMuiTheme({
    palette: {
      main: blueGrey[900],
    },
    secondary: {
      main: '#e1f5fe',
    },
  });

  const token = localStorage.token;

  if (token) {
    const decodedToken = jwtDecode(token);

    //  Check tokoen is expire
    if (decodedToken.exp * 1000 < Date.now()) {
      store.dispatch(logOutUser());
      window.location.href = '/login';
    } else {
      store.dispatch({ type: SET_AUTHENTICATED });
      axios.defaults.headers.common['Authorization'] = token;
      store.dispatch(getUserData());
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={props.authenticated ? DashBoard : Home}
          />
          <>
            <Grid container>
              <Grid item lg={2}>
                <Navbar />
              </Grid>
              <Grid item lg={10}>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/customers" component={Customers} />
                <Route exact path="/contracters" component={Contracter} />
                <Route exact path="/designer" component={Designer} />
                <Route exact path="/plumber" component={Plumber} />
                <Route exact path="/customer/:id" component={OneCustomer} />
                <Route exact path="/addtocart" component={AddToCart} />
                <Route
                  exact
                  path="/products/single/:id"
                  component={SingleProducts}
                />
                <Route
                  exact
                  path="/add/project/customer"
                  component={AddProject}
                />
                <Route exact path="/edit/customer" component={AddProject} />
                <Route exact path="/shop" component={Shop} />
                <Route
                  exact
                  path="/paymentconfirm"
                  component={props.authenticated ? ProductsConfirm : Login}
                />
                <Route
                  exact
                  path="/placeorder"
                  component={props.authenticated ? PlaceOrder : Login}
                />
                <Route
                  exact
                  path="/payment"
                  component={props.authenticated ? Payment : Login}
                />
                <Route
                  exact
                  path="/completeOrder"
                  component={props.authenticated ? CompleteOrder : Login}
                />
                <Route
                  exact
                  path="/order/:id"
                  component={props.authenticated ? PayOrder : Login}
                />
                <Route
                  exact
                  path="/profile"
                  component={props.authenticated ? Profile : Login}
                />
                <Route
                  exact
                  path="/openproject"
                  component={props.authenticated ? OpenProject : Login}
                />
              </Grid>
            </Grid>
          </>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, null)(App);
