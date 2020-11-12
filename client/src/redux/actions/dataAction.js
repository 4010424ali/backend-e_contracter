import axios from 'axios';
import {
  SET_CUSTOMERS,
  CREATE_CUSTOMER,
  LOADING_DATA,
  LOADING_UI,
  SET_ERRORS,
  STOP_UI_LOADING,
  SET_CUSTOMER,
  COMPLETE_PROJECT,
  CLOSE_PROJECT,
  GET_PERPOSALS,
  UPDATE_PERPOSAL,
  DELETE_PERPOSAL,
  CREATE_PERPOSAL,
  CLEAR_ERRORS,
  PERPOSAL_ACTION,
  DELETE_CUSTOMER,
  EDIT_CUSTOMER,
  PERPOSAL_ACTIVE,
  PERPOSAL_CLOSE,
} from '../types';

export const getCustomers = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  axios
    .get('/api/v1/customers')
    .then((res) => {
      console.log(res.data);
      dispatch({ type: SET_CUSTOMERS, payload: res.data });
    })
    .catch(() => {
      dispatch({ type: SET_ERRORS, payload: [] });
    });
};

export const getCustomer = (customerId) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get(`/api/v1/customers/${customerId}`)
    .then((res) => {
      dispatch({ type: SET_CUSTOMER, payload: res.data });
      dispatch({ type: STOP_UI_LOADING });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: STOP_UI_LOADING });
    });
};

export const createCustomer = (data, history) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post('/api/v1/customers', data)
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: CREATE_CUSTOMER, payload: res.data });
      history.push('/customers');
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const editCustomer = (data, id) => (dispatch) => {
  axios
    .put(`/api/v1/customers/${id}`, data)
    .then((res) => {
      dispatch({ type: EDIT_CUSTOMER, payload: res.data });
    })
    .catch((err) => console.log(err));
};

export const deleteCustomer = (id) => (dispatch) => {
  axios
    .delete(`/api/v1/customers/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_CUSTOMER, payload: id });
    })
    .catch((err) => console.log(err));
};

export const completeProject = (user) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get(`/api/v1/customers?status=true&user=${user}`)
    .then((res) => {
      dispatch({ type: COMPLETE_PROJECT, payload: res.data });
      dispatch({ type: STOP_UI_LOADING });
    })
    .catch((err) => console.log(err));
};

export const closeProject = (user) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get(`/api/v1/customers?status=false&user=${user}`)
    .then((res) => {
      dispatch({ type: CLOSE_PROJECT, payload: res.data });
      dispatch({ type: STOP_UI_LOADING });
    })
    .catch((err) => console.log(err));
};

// Perposal action
export const getPerposal = (id) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  axios
    .get(`/api/v1/perposal/${id}`)
    .then((res) => {
      dispatch({ type: GET_PERPOSALS, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const createPerposal = (id, newData) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post(`/api/v1/perposal/${id}`, newData)
    .then((res) => {
      dispatch({ type: CREATE_PERPOSAL, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const updatePerposal = (id, newData) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  axios
    .put(`/api/v1/perposal/${id}`, newData)
    .then((res) => {
      dispatch({ type: UPDATE_PERPOSAL, payload: res.data });
    })
    .catch((err) => console.log(err));
};

export const deletePerposal = (id) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  axios
    .delete(`/api/v1/perposal/${id}`)
    .then(() => {
      dispatch({ type: DELETE_PERPOSAL, payload: id });
    })
    .catch((err) => console.log(err));
};

export const perposalAction = (id) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  axios
    .get(`/api/v1/perposal/accept/${id}`)
    .then((res) => {
      dispatch({ type: PERPOSAL_ACTION, payload: res.data });
    })
    .catch((err) => console.log(err));
};

export const getActivePerposal = () => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get(`/api/v1/perposal/active`)
    .then((res) => {
      dispatch({ type: PERPOSAL_ACTIVE, payload: res.data });
      dispatch({ type: STOP_UI_LOADING });
    })
    .catch((err) => console.log(err));
};

export const getClosePerposal = () => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get('/api/v1/perposal/close')
    .then((res) => {
      dispatch({ type: PERPOSAL_CLOSE, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};
