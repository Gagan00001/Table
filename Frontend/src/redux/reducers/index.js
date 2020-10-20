import { combineReducers } from "redux";
import { GET_DETAILS, LOADING, PAGECOUNT } from "../actions";
const initialState = [];
const loading = false;
const pageCountValue = 0;

const pageCountReducer = (currentPageCount = pageCountValue, action) => {
  switch (action.type) {
    case PAGECOUNT:
      return {
        currentPageCount: action.data,
      };
    default:
      return currentPageCount;
  }
};

const dataReducer = (data = initialState, action) => {
  switch (action.type) {
    case GET_DETAILS:
      return {
        ...data,
        data: action.data,
      };
    default:
      return data;
  }
};
const loadingReducer = (isLoading = loading, action) => {
  switch (action.type) {
    case LOADING:
      return {
        isLoading: action.flag,
      };
    default:
      return isLoading;
  }
};
const rootReducer = combineReducers({
  dataReducer,
  loadingReducer,
  pageCountReducer,
});

export default rootReducer;
