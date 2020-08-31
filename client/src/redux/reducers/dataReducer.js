import {
  SET_CUSTOMERS,
  LOADING_DATA,
  SET_CUSTOMER,
  COMPLETE_PROJECT,
  CLOSE_PROJECT,
  GET_PERPOSALS,
  UPDATE_PERPOSAL,
  DELETE_PERPOSAL,
  CREATE_PERPOSAL,
  PERPOSAL_ACTION,
} from '../types';

const initialState = {
  customers: [],
  customer: {},
  perposals: [],
  completeProject: [],
  closeProject: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_CUSTOMERS:
      return {
        ...state,
        loading: false,
        customers: action.payload,
      };
    case SET_CUSTOMER:
      return {
        ...state,
        customer: action.payload,
      };
    case GET_PERPOSALS:
      return {
        ...state,
        loading: false,
        perposals: action.payload,
      };
    case COMPLETE_PROJECT:
      return {
        ...state,
        completeProject: action.payload,
      };
    case CLOSE_PROJECT:
      return {
        ...state,
        closeProject: action.payload,
      };
    case CREATE_PERPOSAL:
      return {
        ...state,
        perposals: [action.payload.data, ...state.perposals.data],
      };
    case UPDATE_PERPOSAL:
      let index = state.perposals.data.findIndex(
        (per) => per._id === action.payload.data._id
      );
      state.perposals.data[index] = action.payload.data;
      return {
        ...state,
        loading: false,
      };
    case DELETE_PERPOSAL:
      let newindex = state.perposals.data.findIndex(
        (per) => per._id === action.payload
      );
      state.perposals.data.splice(newindex, 1);
      return {
        ...state,
      };
    case PERPOSAL_ACTION:
      let actionIndex = state.perposals.data.findIndex(
        (per) => per._id === action.payload.data._id
      );
      state.perposals.data[actionIndex] = action.payload.data;
      return {
        ...state,
      };
    default:
      return state;
  }
}
