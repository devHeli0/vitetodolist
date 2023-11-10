import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import authReducer from './authSlice';
import persistedReducer from './tasksSlice';
import sessionReducer from './sessionSlice';

const store = configureStore({
  reducer: {
    tasks: persistedReducer,
    session: sessionReducer,
    auth: authReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
