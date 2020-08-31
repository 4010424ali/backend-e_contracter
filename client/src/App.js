import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import { Grid } from '@material-ui/core';
import './scss/App.scss';

// Page
import Home from './page/Home';
import Login from './page/Login';
import Register from './page/Register';
import Customers from './page/Customers';

import OneCustomer from './components/OneCustomer';
import Profile from './components/Profile';

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
            component={props.authenticated ? Profile : Home}
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
                <Route exact path="/customer/:id" component={OneCustomer} />
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
