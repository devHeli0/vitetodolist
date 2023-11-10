import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addTask, selectTasks } from '../../store/tasksSlice';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import { TaskFormProps } from '../../interfaces/Task_interfaces';

const TaskForm: React.FC<TaskFormProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const tasks = useSelector(selectTasks);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isOpen && id) {
      const task = tasks.find((task) => task.id === Number(id));
      if (task) {
        setName(task.name);
        setDescription(task.description);
      }
    }
  }, [isOpen, id, tasks]);

  const handleSubmit = () => {
    const newTask = {
      id: id ? Number(id) : tasks.length + 1,
      name,
      description,
    };

    if (id) {
      dispatch(addTask(newTask));
    } else {
      dispatch(addTask(newTask));
    }

    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setDescription('');
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        {id ? 'Edit Task' : 'Adicionar Tarefa'}
      </DialogTitle>
      <DialogContent>
        <form className="flex flex-col space-y-4">
          <label className="text-gray-400">
            <input
              placeholder="Tarefa"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
          </label>
          <label className="text-gray-400">
            <textarea
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-8 py-11 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
          </label>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;
