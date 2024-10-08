import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import cookieStorage from 'redux-persist-cookie-storage';
import { Cookies } from 'react-cookie';
import { userReducer } from '../features/usersSlice';

const cookies = new Cookies();

const usersPersistConfig = {
  key: 'localPay:user',
  storage: cookieStorage(cookies),
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  userState: persistReducer(usersPersistConfig, userReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);
