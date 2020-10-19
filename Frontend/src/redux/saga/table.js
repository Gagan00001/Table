import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "../../api";
import { GET_DETAILS, GET_DETAILS_FETCH } from "../actions";

function getApi() {
  get()
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
}

function* fetchdata(action) {
  console.log("Saga is running", action);
  const data = yield call(getApi);
  yield put({ type: GET_DETAILS, data });
}

function* tableSaga() {
  yield takeEvery(GET_DETAILS_FETCH, fetchdata);
}
export default tableSaga;
