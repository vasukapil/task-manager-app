import { useState } from 'react';
import { useCreateTaskMutation } from '../features/tasks/apiSlice';
import { customAlphabet } from 'nanoid'

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [createTask] = useCreateTaskMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask({ id:Number(customAlphabet('0123456789',5)()),userId:"5",title, completed: false,inProgress:true,todo:title  });
    setTitle('');
  };
  

  return (
    <form onSubmit={handleSubmit} className="my-6 flex justify-center items-center">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Task"
        className="flex-grow p-2 border rounded mb-2 md:mb-0 md:mr-2"
      />
      <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
