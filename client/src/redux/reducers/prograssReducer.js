import {
  GET_ALL_PROGRESS,
  CREATE_PROGRESS,
  UPDATE_PROGRESS,
  DELETE_PROGRESS,
} from '../types';
const initialState = {
  progress: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PROGRESS:
      return {
        ...state,
        progress: action.payload,
        loading: false,
      };
    case CREATE_PROGRESS:
      return {
        ...state,
        progress: [action.payload.data, ...state.progress.data],
      };
    case UPDATE_PROGRESS:
      let index = state.progress.data.findIndex(
        (per) => per._id === action.payload.data._id
      );
      state.progress.data[index] = action.payload.data;
      return {
        ...state,
      };
    case DELETE_PROGRESS:
      let newindex = state.progress.data.findIndex(
        (per) => per._id === action.payload
      );
      state.progress.data.splice(newindex, 1);
      return {
        ...state,
      };
    default:
      return state;
  }
}
