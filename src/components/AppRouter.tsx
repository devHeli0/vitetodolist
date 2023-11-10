import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import TaskList from '../features/tasks/TaskList';
import TaskForm from '../features/tasks/TaskForm';
import Login from '../features/auth/Login';

const AppRouter: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: { auth: { isAuthenticated: boolean } }) =>
      state.auth.isAuthenticated
  );

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <TaskList /> : <Login />}
        />
        <Route
          path="/tasks/new"
          element={
            isAuthenticated ? (
              <TaskForm isOpen={true} onClose={() => {}} />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/tasks/edit/:id"
          element={
            isAuthenticated ? (
              <TaskForm isOpen={true} onClose={() => {}} />
            ) : (
              <Login />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
