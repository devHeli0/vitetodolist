import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTasks } from '../../store/tasksSlice';
import TaskItem from './TaskItem';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TaskForm from './TaskForm';
import { Task } from '../../store/tasksSlice';

const TaskList: React.FC = () => {
  const tasks = useSelector(selectTasks);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900">
      <div className="text-center">
        <div className="bg-gray-800 py-4 px-4 sm:px-8 rounded-lg shadow-md w-full sm:max-w-md mx-auto text-slate-700 mb-14">
          <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-400">
            Lista de tarefas
          </h1>
          <ul>
            {tasks.map((task: Task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>

          <div className="mt-4 flex justify-center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModal}
            >
              Add Task
            </Button>
          </div>

          <Modal open={isModalOpen} onClose={handleCloseModal}>
            <div className="bg-black p-4 w-96 mx-auto mt-20">
              <TaskForm
                isOpen={isModalOpen}
                onClose={handleCloseModal}
              />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
