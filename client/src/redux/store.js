import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import Cookie from 'js-cookie';
import thunk from 'redux-thunk';

// Reducer
import userReducer from './reducers/userReducer';
import UIReducer from './reducers/uiReducer';
import dataReducer from './reducers/dataReducer';
import profileReducer from './reducers/profileReducer';
import progressReducer from './reducers/prograssReducer';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  myOrderListReducer,
  orderListReducer,
  orderDeleteReducer,
} from './reducers/orderReducer';

import {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
  productReviewSaveReducer,
  productSearchReducer,
} from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';

const cartItems = Cookie.getJSON('cartItems') || [];

const initailState = {
  cart: { cartItems, shipping: {}, payment: {} },
};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  UI: UIReducer,
  data: dataReducer,
  info: profileReducer,
  progress: progressReducer,
  productList: productListReducer,
  productSearch: productSearchReducer,
  productDetails: productDetailsReducer,
  productSave: productSaveReducer,
  cart: cartReducer,
  productDelete: productDeleteReducer,
  productReviewSave: productReviewSaveReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  myOrderList: myOrderListReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
});

const store = createStore(
  reducers,
  initailState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
