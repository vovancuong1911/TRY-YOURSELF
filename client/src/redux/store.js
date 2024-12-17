import { legacy_createStore as createStore, combineReducers } from 'redux';
import userReducer from './userStore/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;
