import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../store/authSlice';
import { selectTasks } from '../../store/tasksSlice';

import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { Task } from '../../interfaces/Task_interfaces';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const TaskList: React.FC = () => {
  const tasks = useSelector(selectTasks);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLogoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenLogoutDialog = () => {
    setLogoutDialogOpen(true);
  };

  const handleCloseLogoutDialog = () => {
    setLogoutDialogOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseLogoutDialog();
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900">
      <div className="text-center">
        <div className="bg-gray-800 py-4 px-4 sm:px-8 rounded-lg shadow-md w-full sm:max-w-md mx-auto text-slate-700 mb-14 overflow-hidden">
          <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-400">
            Lista de tarefas
          </h1>
          <div className="max-h-80 overflow-y-auto mb-4">
            <ul>
              {tasks.map((task: Task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </ul>
          </div>

          <div className="mt-4 flex justify-center space-x-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModal}
            >
              Adicionar Tarefa
            </Button>

            <IconButton
              color="primary"
              onClick={handleOpenLogoutDialog}
            >
              <ExitToAppIcon />
            </IconButton>
          </div>

          <Modal open={isModalOpen} onClose={handleCloseModal}>
            <div className="bg-black p-4 w-96 mx-auto mt-20">
              <TaskForm
                isOpen={isModalOpen}
                onClose={handleCloseModal}
              />
            </div>
          </Modal>

          <Dialog
            open={isLogoutDialogOpen}
            onClose={handleCloseLogoutDialog}
          >
            <DialogTitle>Confirmar Logout</DialogTitle>
            <DialogContent>
              <p>Tem certeza de que deseja sair?</p>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseLogoutDialog}
                color="primary"
              >
                Cancelar
              </Button>
              <Button onClick={handleLogout} color="primary">
                Logout
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
