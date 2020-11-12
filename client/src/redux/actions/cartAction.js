import Axios from 'axios';
import Cookie from 'js-cookie';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from '../types';

// add to cart fun ction
const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    // get prooducts from backned
    const { data } = await Axios.get(`/api/v1/products/${productId}`);
    // store in in state of cart Reducer redux store
    dispatch({
      type: CART_ADD_ITEM,
      // payload send to cartreducer for backend
      payload: {
        product: data.product._id,
        name: data.product.name,
        image: data.product.image,
        price: data.product.price,
        countInStock: data.product.countInStock,
        qty,
      },
    });
    // get the cart from cookies
    const {
      cart: { cartItems },
    } = getState();
    // cart item save to cookies
    Cookie.set('cartItems', JSON.stringify(cartItems));
  } catch (error) {}
};

// remove item from cart from cart
const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });

  const {
    cart: { cartItems },
  } = getState();
  Cookie.set('cartItems', JSON.stringify(cartItems));
};

// save the shiping address
const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
};

// save the payment method
const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
};

export { addToCart, removeFromCart, saveShipping, savePayment };
