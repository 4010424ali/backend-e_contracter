import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_REVIEW_SAVE_REQUEST,
  PRODUCT_REVIEW_SAVE_FAIL,
  PRODUCT_REVIEW_SAVE_SUCCESS,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SEARCH_FAIL,
} from '../types';
import axios from 'axios';
import Axios from 'axios';

const listProducts = (
  category = '',
  searchKeyword = '',
  sortOrder = ''
) => async (dispatch) => {
  try {
    // request for producst
    dispatch({ type: PRODUCT_LIST_REQUEST });
    // send the get request to server
    const { data } = await axios.get(`/api/v1/products`);
    // send the data product reducer
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.products });
  } catch (error) {
    // send the error if any
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const searchProducts = (
  category = '',
  searchKeyword = '',
  sortOrder = ''
) => async (dispatch) => {
  try {
    // request for producst
    dispatch({ type: PRODUCT_SEARCH_REQUEST });
    // send the get request to server
    const { data } = await axios.get(
      `/api/v1/products/search?category=${category}&searchKeyword=${searchKeyword}&sortOrder=${sortOrder}`
    );
    // send the data product reducer
    dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data.products });
  } catch (error) {
    // send the error if any
    dispatch({ type: PRODUCT_SEARCH_FAIL, payload: error.message });
  }
};

const discountProducts = () => async (dispatch) => {
  try {
    // request for producst
    dispatch({ type: PRODUCT_LIST_REQUEST });
    // send the get request to server
    const { data } = await axios.get(`/api/v1/products/discount`);
    // send the data product reducer
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.products });
  } catch (error) {
    // send the error if any
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

// save the products
const saveProduct = (product) => async (dispatch, getState) => {
  try {
    // request save the products
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    // get user info fro cookies
    const {
      userSignin: { userInfo },
    } = getState();
    // check products
    if (!product._id) {
      // send the post request to server
      const { data } = await Axios.post('/api/products', product, {
        headers: {
          // set authen tication headers
          Authorization: 'Bearer ' + userInfo.token,
        },
      });
      // send the data to products reducer for frontend
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    } else {
      // send the update request to server
      const { data } = await Axios.put(
        '/api/products/' + product._id,
        product,
        {
          // set authentication headers
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        }
      );
      // send the data to products reducer for frontend
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    // error if any
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};

// details products
const detailsProduct = (productId) => async (dispatch) => {
  try {
    // request delete the products
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    // send the get request
    const { data } = await axios.get(`/api/v1/products/${productId}`);
    // send the data to products reducer for frontend
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
  } catch (error) {
    // error if any
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

const deleteProdcut = (productId) => async (dispatch, getState) => {
  try {
    // get the user info
    const {
      userSignin: { userInfo },
    } = getState();
    // request for delete product
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });

    // send the delete request to frontend
    const { data } = await axios.delete('/api/products/' + productId, {
      headers: {
        // set authentication
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    // send the data to products reducer for frontend
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    // eroor if any
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

const saveProductReview = (productId, review) => async (dispatch, getState) => {
  console.log(review);
  try {
    // request for product save reviews
    dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
    // send the post to backend server
    const { data } = await axios.post(
      `/api/v1/products/${productId}/reviews`,
      review
    );
    // send the data to products reducer for frontend
    dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
  } catch (error) {
    // report error
    dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message });
  }
};

export {
  listProducts,
  detailsProduct,
  saveProduct,
  deleteProdcut,
  saveProductReview,
  discountProducts,
  searchProducts,
};
