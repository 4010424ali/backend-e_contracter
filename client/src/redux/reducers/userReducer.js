import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  LOADING_USER,
  UPLOAD_IMAGE,
} from '../types';

const initialSate = {
  authenticated: false,
  loading: false,
  data: {},
};

export default function (state = initialSate, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialSate;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case UPLOAD_IMAGE:
      state.data.imageUrl = action.payload.data;
      return {
        ...state,
      };
    default:
      return state;
  }
}
