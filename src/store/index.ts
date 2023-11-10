import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist'; 

import persistedReducer from './tasksSlice';

const store = configureStore({
  reducer: {
    tasks: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };

