import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/index";
import rootReducer from "./reducers/index";

const sagaMiddleware = createSagaMiddleware();
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(rootReducer, composeEnhancer());
const store = compose(
  applyMiddleware(sagaMiddleware),
  window.devToolsExtension && window.devToolsExtension()
)(createStore)(rootReducer);
sagaMiddleware.run(rootSaga);

export default store;
