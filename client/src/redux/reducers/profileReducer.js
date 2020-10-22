import { CONTRACTER, PLUMBER, DESIGNER } from '../types';
const initialState = {
  profiles: [],
  contracter: [],
  plumber: [],
  designer: [],
  profile: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CONTRACTER:
      return {
        ...state,
        contracter: action.payload,
      };
    case PLUMBER:
      return {
        ...state,
        plumber: action.payload,
      };
    case DESIGNER:
      return {
        ...state,
        designer: action.payload,
      };
    default:
      return state;
  }
}
