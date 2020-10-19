import { combineReducers } from "redux";
import { GET_DETAILS, LOADING, PAGECOUNT } from "../actions";
const initialState = [];
const loading = false;
const pageCountValue = 0;

const pageCountReducer = (state = pageCountValue, action) => {
  switch (action.type) {
    case PAGECOUNT:
      return {
        state: action.data,
      };
    default:
      return state;
  }
};

const detailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DETAILS:
      return {
        ...state,
        details: action.data,
      };
    default:
      return state;
  }
};
const loadingReducer = (state = loading, action) => {
  switch (action.type) {
    case LOADING:
      return {
        state: action.flag,
      };
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  detailsReducer,
  loadingReducer,
  pageCountReducer,
});

export default rootReducer;
