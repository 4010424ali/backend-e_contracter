import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { connect, useSelector } from 'react-redux';
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  Button,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import { Alert, AlertTitle } from '@material-ui/lab';

import { loginUser } from '../redux/actions/userAction';

const useStyle = makeStyles((theme) => ({
  text: {
    color: '#ffffff',
    marginBottom: '1rem',
  },
  mb: {
    marginBottom: '1rem',
    borderColor: '#ffffff',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '20rem',
    color: 'white',
  },
  btn: {
    background: blueGrey[900],
    color: '#fff',
    marginTop: '1rem',
    width: '20rem',
  },
}));

const Login = (props) => {
  const classes = useStyle();
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const [error, setError] = useState(null);
  const err = useSelector((state) => state.UI.errors);
  useEffect(() => {
    if (err) {
      setError(err);
    }
  }, [err]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      email: values.email,
      password: values.password,
    };

    props.loginUser(newUser, props.history);

    setError(null);
  };

  return (
    <div className="login-flex">
      <div className="overlay">
        <div className="flex">
          <Typography variant="h4" className={classes.text}>
            Login
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {error ? (
              <Alert variant="filled" severity="error">
                <AlertTitle>Authentication Error</AlertTitle>
                {error.error}
              </Alert>
            ) : null}
            <div className="form-flex">
              <TextField
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                className={classes.textField}
                margin="normal"
                onChange={handleChange('email')}
              />
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
              <Button className={classes.btn} type="sumbit" color="primary">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI.errors,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
