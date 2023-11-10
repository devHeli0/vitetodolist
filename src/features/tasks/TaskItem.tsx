import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeTask, updateTask } from '../../store/tasksSlice';
import Modal from '@mui/material/Modal';
import { TaskItemProps } from '../../interfaces/Task_interfaces';

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({
    name: task.name,
    description: task.description,
  });

  const handleRemove = () => {
    dispatch(removeTask(task.id));
  };

  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleEdit = () => {
    dispatch(updateTask({ id: task.id, ...editedTask }));
    handleModalClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedTask((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="border p-4 mb-4 bg-white rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-2">{task.name}</h3>
      <p className="text-gray-600">{task.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handleEditClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Editar
        </button>
        <button
          onClick={handleRemove}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Deletar
        </button>
      </div>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <div className="bg-white p-4 w-96 mx-auto mt-20">
          <h2 className="text-2xl font-semibold mb-4">
            Editar tarefa
          </h2>
          <form className="flex flex-col space-y-4">
            <label className="text-gray-400">
              <input
                placeholder="Nome"
                type="text"
                name="name"
                value={editedTask.name}
                onChange={handleInputChange}
                className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </label>
            <label className="text-gray-400">
              <textarea
                placeholder="Descrição"
                name="description"
                value={editedTask.description}
                onChange={handleInputChange}
                className="px-8 py-11 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </label>
          </form>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Salvar
            </button>
            <button
              onClick={handleModalClose}
              className="px-4 py-2 ml-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TaskItem;
