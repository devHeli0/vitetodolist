import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';

import AppRouter from './components/AppRouter';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </Provider>
  );
};

export default App;
