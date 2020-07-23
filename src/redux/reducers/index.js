/* eslint-disable prettier/prettier */
// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers
import authReducer from './authReducer';
import profileReducer from './profileReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer,
  profileReducer,
});

// Exports
export default rootReducer;
