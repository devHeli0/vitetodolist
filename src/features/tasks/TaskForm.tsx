import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  addTask,
  selectTasks,
} from '../../store/tasksSlice';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
}

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
      <DialogTitle>{id ? 'Edit Task' : 'Create Task'}</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
