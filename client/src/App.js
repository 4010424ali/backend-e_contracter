import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import './scss/App.scss';
import Home from './page/Home';
import Login from './page/Login';
import Register from './page/Register';

// layout
import Navbar from './components/layout/Navbar';

function App() {
  const theme = createMuiTheme({
    palette: {
      main: blueGrey[900],
    },
    secondary: {
      main: '#e1f5fe',
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <>
            <div className="flex">
              <div className="flex-nav">
                <Navbar />
              </div>
              <div className="flex-body">
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </div>
            </div>
          </>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
