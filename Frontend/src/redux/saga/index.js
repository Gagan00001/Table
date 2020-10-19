import { all, fork } from "redux-saga/effects";
import tableSaga from "./table";

export default function* rootSaga() {
  yield all([fork(tableSaga)]);
}
