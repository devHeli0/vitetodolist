import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeTask, updateTask } from '../../store/tasksSlice';
import Modal from '@mui/material/Modal';

interface TaskItemProps {
  task: {
    id: number;
    name: string;
    description: string;
  };
}

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
          className="text-blue-500 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={handleRemove}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <div className="bg-white p-4 w-96 mx-auto mt-20">
          <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={editedTask.name}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-600"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={editedTask.description}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
          </form>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={handleModalClose}
              className="px-4 py-2 ml-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TaskItem;
