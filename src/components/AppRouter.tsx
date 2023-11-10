import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import TaskList from '../features/tasks/TaskList';
import TaskForm from '../features/tasks/TaskForm';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route
          path="/tasks/new"
          element={<TaskForm isOpen={true} onClose={() => {}} />}
        />
        <Route
          path="/tasks/edit/:id"
          element={<TaskForm isOpen={true} onClose={() => {}} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
