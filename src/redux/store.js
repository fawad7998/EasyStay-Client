import {configureStore} from '@reduxjs/toolkit';
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';
import {rootPersistConfig, rootReducer} from './rootReducer';

import api from './middleware/api';

// ----------------------------------------------------------------------

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(api),
});

const persistor = persistStore(store);

const dispatch = typeof store.dispatch;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export {store, persistor, dispatch, useSelector, useDispatch};
