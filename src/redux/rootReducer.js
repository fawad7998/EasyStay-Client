import {combineReducers} from 'redux';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// slices
import userReducer from './slices/user';
import socketReducer from './slices/socket';
import loginResetReducer from './slices/loginReset';
import {clearStore} from './util';

// ----------------------------------------------------------------------

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const appReducer = combineReducers({
  user: userReducer,
  socket: socketReducer,
  loginReset: loginResetReducer,
});

const rootReducer = (state, action) => {
  // TODO: currently this doesn't clear with persist, only clears temporary
  if (action.type === clearStore.type) {
    storage.removeItem('persist:root');
    storage.removeItem('persist:user');
    storage.removeItem('persist:socket');

    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export {rootPersistConfig, rootReducer};
