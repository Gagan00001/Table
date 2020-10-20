import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "../../api";
import {
  getDetails,
  GET_DETAILS,
  GET_DETAILS_FETCH,
  setPageCount,
} from "../actions";

function getApi({ url, params = {} }) {
  return get({ url, params })
    .then((response) => {
      console.log({ data: response.data.result, count: response.data.count });
      return { data: response.data.result, count: response.data.count };
    })
    .catch((error) => {
      throw error;
    });
}

function* fetchdata(action) {
  console.log("Saga is running", action);
  try {
    const { data, count } = yield call(getApi, {
      url: action.data.url,
      params: action.data.params,
    });
    console.log(data);
    yield put(getDetails(data));
    yield put(setPageCount(Math.ceil(count/data.length)));
  } catch (e) {
    yield put({});
  }
}

function* tableSaga() {
  yield takeEvery(GET_DETAILS_FETCH, fetchdata);
}
export default tableSaga;
