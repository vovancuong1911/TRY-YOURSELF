import { LOGIN_USER, LOGOUT_USER } from './actionTypes';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;