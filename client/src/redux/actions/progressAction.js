import axios from 'axios';
import {
  GET_ALL_PROGRESS,
  LOADING_UI,
  STOP_UI_LOADING,
  SET_ERRORS,
  CREATE_PROGRESS,
  CLEAR_ERRORS,
  UPDATE_PROGRESS,
  DELETE_PROGRESS,
} from '../types';

export const getAllProgresss = (id) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`http://localhost:5000/api/v1/progress/${id}`)
    .then((res) => {
      dispatch({ type: GET_ALL_PROGRESS, payload: res.data });
      dispatch({ type: STOP_UI_LOADING });
    })
    .catch((err) => console.log(err));
};

export const createProgress = (id, data) => (dispatch) => {
  axios
    .post(`http://localhost:5000/api/v1/progress/${id}`, data)
    .then((res) => {
      dispatch({ type: CREATE_PROGRESS, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const updateProgress = (id, data) => (dispatch) => {
  axios
    .put(`http://localhost:5000/api/v1/progress/r/${id}`, data)
    .then((res) => {
      dispatch({ type: UPDATE_PROGRESS, payload: res.data });
    })
    .catch((err) => console.log(err));
};

export const deleteProgress = (id) => (dispatch) => {
  axios
    .delete(`http://localhost:5000/api/v1/progress/r/${id}`)
    .then(() => {
      dispatch({ type: DELETE_PROGRESS, payload: id });
    })
    .catch((err) => console.log(err));
};
