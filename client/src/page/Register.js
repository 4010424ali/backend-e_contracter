import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { connect, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
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
import { Alert, AlertTitle } from '@material-ui/lab';
import { blueGrey } from '@material-ui/core/colors';

import { signupUser } from '../redux/actions/userAction';

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
  alert: {
    width: '25rem',
  },
}));

const Register = (props) => {
  const classes = useStyle();
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
    name: '',
    confirmPassword: '',
    role: 'user',
  });
  // Set Error
  const [error, setError] = useState(null);
  const err = useSelector((state) => state.UI.errors);

  // Role for selector
  const roles = [
    {
      label: 'user',
      value: 'user',
    },
    {
      label: 'publisher',
      value: 'publisher',
    },
  ];
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

    if (values.password === values.confirmPassword) {
      const newUser = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      };

      props.signupUser(newUser, props.history);
      setError(null);
      setValues({
        email: '',
        password: '',
        showPassword: false,
        name: '',
        confirmPassword: '',
        role: 'user',
      });
    }

    setError({ error: 'Password does not match' });
  };
  return (
    <div className="login-flex">
      <div className="overlay">
        <div className="flex">
          <Typography variant="h4" className={classes.text}>
            Rgister
          </Typography>
          {error ? (
            <Alert className={classes.alert} variant="filled" severity="error">
              <AlertTitle>Authentication Error</AlertTitle>
              {error.error}
            </Alert>
          ) : null}
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <div className="form-flex-register">
              <TextField
                name="name"
                type="text"
                label="Name"
                variant="outlined"
                className={classes.textField}
                margin="normal"
                onChange={handleChange('name')}
              />
              <TextField
                name="email"
                loginUser
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
                        aria-label="confirmPassword"
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
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <InputLabel htmlFor="confirmPassword">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="confirmPassword"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.confirmPassword}
                  onChange={handleChange('confirmPassword')}
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
                  labelWidth={130}
                />
              </FormControl>
              <TextField
                id="role"
                select
                label="Select role"
                value={values.role}
                className={classes.textField}
                onChange={handleChange('role')}
                SelectProps={{
                  native: true,
                }}
                helperText="Please select your role"
                variant="outlined"
              >
                {roles.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <Button className={classes.btn} type="sumbit" color="primary">
                Register
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
  UI: state.UI,
});

const mapActionsToProps = {
  signupUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Register);
