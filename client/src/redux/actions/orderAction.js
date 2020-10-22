import Axios from 'axios';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
} from '../types';

// create the order
const createOrder = (order) => async (dispatch, getState) => {
  try {
    // send the order request
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    // get the user info
    const {
      userSignin: { userInfo },
    } = getState();
    //  post the order
    const {
      data: { data: newOrder },
    } = await Axios.post('/api/v1/orders', order, {
      // set authentication
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    // send the data to order reducer for frontend
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
  } catch (error) {
    // send the error if any
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
};

// list my all the orders
const listMyOrders = () => async (dispatch, getState) => {
  try {
    // send the reqursr
    dispatch({ type: MY_ORDER_LIST_REQUEST });
    // get the user information
    const {
      userSignin: { userInfo },
    } = getState();
    // get the data from server
    const { data } = await Axios.get('/api/v1/orders/mine', {
      // set the authentication
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    // send the data to order reducer for frontend
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data.orders });
  } catch (error) {
    // error if any
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
  }
};

// List all the order
const listOrders = () => async (dispatch, getState) => {
  try {
    // send the request
    dispatch({ type: ORDER_LIST_REQUEST });
    // get the user infro
    const {
      userSignin: { userInfo },
    } = getState();
    // get the data from server
    const { data } = await Axios.get('/api/orders', {
      // set the authentication
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    // send the data to order reducer for frontend
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    // set the error
    dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
  }
};

// detail of the order
const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    // request order details
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    // get   user info
    const {
      userSignin: { userInfo },
    } = getState();
    // get the data from server
    const { data } = await Axios.get(`/api/v1/orders/${orderId}`, {
      // set the authentication
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    // send the data to order reducer for frontend
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    // set the error
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
  }
};

const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  try {
    // request for pay order
    dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
    // get user info
    const {
      userSignin: { userInfo },
    } = getState();
    // send the update request to backend server
    const { data } = await Axios.put(
      `/api/v1/orders/${order._id}/pay`,
      paymentResult,
      {
        // set authentication error
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    // send the data to order reducer for frontend
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    // delete the error
    dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
  }
};

// delete order
const deleteOrder = (orderId) => async (dispatch, getState) => {
  try {
    // req for delete order
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
    // get user info
    const {
      userSignin: { userInfo },
    } = getState();
    // send the delete request to server
    const { data } = await Axios.delete('/api/orders/' + orderId, {
      // set Authentication
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    // send the data to order reducer for frontend
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    // set the error if any
    dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
  }
};
export {
  createOrder,
  detailsOrder,
  payOrder,
  listMyOrders,
  listOrders,
  deleteOrder,
};
