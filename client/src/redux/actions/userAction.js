import axios from 'axios';

import {
  SET_USER,
  SET_ERRORS,
  LOADING_USER,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  STOP_UI_LOADING,
  UPDATE_DATA,
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

export const logOutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
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

export const updateData = (userData) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .put(`http://localhost:5000/api/v1/auth/updatedetails`, userData)
    .then((res) => {
      dispatch({ type: STOP_UI_LOADING });
      dispatch({ type: UPDATE_DATA, payload: res.data });
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
  localStorage.setItem('token', `Bearer ${token}`);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
