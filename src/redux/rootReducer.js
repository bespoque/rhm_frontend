import { combineReducers } from 'redux';
import dashboard from './dashboard/dashboard';
import colors from './colors/colors';
import { config } from './config/config.reducer';
import leftSidebar from './left-sidebar/left-sidebar';
import palettes from './palettes/palettes';
import modal from './modal/modal.reducer';
import signUp from './signup/signup.reducer';
import signUpAuth from './signup-auth/signup-auth.reducer';
import authentication from './authentication/auth.reducer';
import navigationAdmin from './navigation/navigationAdmin';
import navigationATOfficer from './navigation/navigationATOfficer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['signUp', 'signUpAuth', 'authentication'],
};

const rootReducer = combineReducers({
  dashboard,
  navigationAdmin,
  navigationATOfficer,
  colors,
  config,
  leftSidebar,
  palettes,
  modal,
  signUp,
  signUpAuth,
  authentication,
});

export default persistReducer(persistConfig, rootReducer);
