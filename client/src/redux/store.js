import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Reducer
import userReducer from './reducers/userReducer';
import UIReducer from './reducers/uiReducer';
import dataReducer from './reducers/dataReducer';

const initailState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  UI: UIReducer,
  data: dataReducer,
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
