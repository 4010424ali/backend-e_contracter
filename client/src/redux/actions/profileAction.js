import axios from 'axios';

import {
  CONTRACTER,
  DESIGNER,
  PLUMBER,
  LOADING_UI,
  STOP_UI_LOADING,
} from '../types';

export const getContracter = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get('http://localhost:5000/api/v1/profile/p')
    .then((res) => {
      dispatch({ type: CONTRACTER, payload: res.data });
      dispatch({ type: STOP_UI_LOADING });
    })
    .catch((err) => {
      dispatch({ type: STOP_UI_LOADING });
      console.log(err);
    });
};

export const getPlumber = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get('http://localhost:5000/api/v1/profile/plu')
    .then((res) => {
      dispatch({ type: PLUMBER, payload: res.data });
      dispatch({ type: STOP_UI_LOADING });
    })
    .catch((err) => {
      dispatch({ type: STOP_UI_LOADING });
      console.log(err);
    });
};

export const getDesigner = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get('http://localhost:5000/api/v1/profile/des')
    .then((res) => {
      dispatch({ type: DESIGNER, payload: res.data });
      dispatch({ type: STOP_UI_LOADING });
    })
    .catch((err) => {
      dispatch({ type: STOP_UI_LOADING });
      console.log(err);
    });
};
