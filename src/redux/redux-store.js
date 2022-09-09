import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { registrationReducer } from "./registrationReducer";
import thunkMiddleWare from "redux-thunk";

let reducers = combineReducers({
  registration: registrationReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

window.store = store;

export default store;