import { createContext, useReducer } from 'react';

const LOADING = 'LOADING';
const SET_AUTHORIZED = 'SET_AUTHORIZED';
const SET_UNAUTHORIZED = 'SET_UNAUTHORIZED';
const LOGOUT = 'LOGOUT';

export const loading = () => ({
  type: LOADING,
});

export const setAuthorized = (payload) => ({
  type: SET_AUTHORIZED,
  payload,
});

export const setUnauthorized = () => ({
  type: SET_UNAUTHORIZED,
});

export const doLogout = () => ({
  type: LOGOUT,
});

const initialState = {
  isLoading: false,
  isLoggedIn: null,
  currentUser: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'SET_AUTHORIZED':
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        currentUser: action.payload,
      };
    case 'SET_UNAUTHORIZED':
      return { ...state, isLoggedIn: false };

    case 'LOGOUT':
      return { ...initialState, isLoggedIn: false };

    default:
      return { ...state };
  }
};

const CurrentUserContext = createContext();

const CurrentUserProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);
  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>;
};

export { CurrentUserContext, CurrentUserProvider };
