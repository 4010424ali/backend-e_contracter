import axios from 'axios';

import {
  SET_USER,
  SET_ERRORS,
  LOADING_USER,
  CLEAR_ERRORS,
  LOADING_UI,
} from '../types';

export const loginUser = (userData, history) => (dispatch) => {
  console.log(userData);

  dispatch({ type: LOADING_UI });
  axios
    .post('http://localhost:5000/api/v1/auth/login', userData)
    .then((res) => {
      console.log(res.data.token);
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const signupUser = (newUser, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post('http://localhost:5000/api/v1/auth/register', newUser)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });

  axios
    .get('http://localhost:5000/api/v1/auth/me')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(`Error ${err}`);
    });
};

const setAuthorizationHeader = (token) => {
  localStorage.setItem('token', `Bearer ${token}`);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
