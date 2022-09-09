import { userData } from "../fakeServer";

const REGISTRATE = "REGISTRATE";
const LOGIN = "LOGIN";
const SET_PASSWORD = "SET_PASSWORD";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_ERROR = "TOGGLE_ERROR";
const LOGOUT = "LOGOUT";

let initialState = {
  isAuth: false,
  isLogged: false,
  isFetching: false,
  isError: false,
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATE:
      return {
        ...state,
        isAuth: true,
      };
    case LOGIN:
      return {
        ...state,
        isLogged: true,
      };
    case LOGOUT:
      return {
        ...state,
        ...initialState,
      };
    case TOGGLE_ERROR:
      return {
        ...state,
        isError: action.isError,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: !state.isFetching,
      };
    default:
      return state;
  }
};

const registrationAC = () => {
  return {
    type: REGISTRATE,
  };
};
const loginAC = () => {
  return {
    type: LOGIN,
  };
};
const logoutAC = () => {
  return {
    type: LOGOUT,
  };
};
const errorAC = (isError) => {
  return {
    type: TOGGLE_ERROR,
    isError,
  };
};
const isFetching = () => {
  return {
    type: TOGGLE_IS_FETCHING,
  };
};
export const resetPassword = () => {
  return {
    type: SET_PASSWORD,
  };
};

export const registrationThunk = (email, password) => (dispatch) => {
  dispatch(isFetching());
  setTimeout(() => {
    dispatch(registrationAC(email, password));
    userData.setEmail(email);
    userData.setPassword(password);
    dispatch(isFetching());
  }, 2000);
};
export const loginThunk = (email, password) => (dispatch) => {
  dispatch(isFetching());
  if (email === userData.getEmail() && password === userData.getPassword()) {
    setTimeout(() => {
      dispatch(loginAC());
      dispatch(errorAC(false));
      dispatch(isFetching());
    }, 1000);
  } else {
    setTimeout(() => {
      dispatch(errorAC(true));
      dispatch(isFetching());
    }, 1000);
  }
};
export const logoutThunk = () => (dispatch) => {
  setTimeout(() => {
    dispatch(logoutAC());
    userData.setPassword("");
    userData.setEmail("");
  }, 1000);
};
export const resetPasswordThunk = (newPassword, oldPassword) => (dispatch) => {
  dispatch(isFetching());
  if (oldPassword === userData.getPassword()) {
    setTimeout(() => {
      userData.setPassword(newPassword);
      dispatch(errorAC(false));
      dispatch(isFetching());
    }, 1000);
  } else {
    setTimeout(() => {
      dispatch(errorAC(true));
      dispatch(isFetching());
    }, 1000);
  }
};

export {registrationReducer}