export interface Task {
  id: number;
  name: string;
  description: string;
}

export interface TasksState {
  tasks: Task[];
}

export interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface TaskItemProps {
  task: {
    id: number;
    name: string;
    description: string;
  };
}
