import { useState, useMemo } from "react";
import { useDeleteTaskMutation, useFetchTasksQuery, useUpdateTaskMutation } from "../features/tasks/apiSlice";
import TaskForm from "./TaskForm";
import { Link } from "react-router-dom";

const TODO_STATUS = ["Todo", "In Progress", "Done"];

const TaskList = () => {
  const { data: tasks, isLoading } = useFetchTasksQuery();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [editTodo, setEditTodo] = useState({ id: null, value: "" });

  const handleEdit = (id, defaultValue) => {
    setEditTodo(prev => prev.id !== id ? { id, value: defaultValue } : { id: null, value: "" });
    if (editTodo.id === id) {
      updateTask({ id, updatedTask: { todo: editTodo.value } });
    }
  };

  const handleStatusUpdate = (value, todo) => {
    const updatedTask = {
      completed: value === TODO_STATUS[2],
      inProgress: value === TODO_STATUS[1],
    };
    updateTask({ id: todo.id, updatedTask });
  };

  const groupedTasks = useMemo(() => {
    if (!tasks) return {};
    return tasks.todos.reduce((acc, task) => {
      const status = task.completed ? TODO_STATUS[2] : (task.inProgress ? TODO_STATUS[1] : TODO_STATUS[0]);
      if (!acc[status]) acc[status] = [];
      acc[status].push(task);
      return acc;
    }, {});
  }, [tasks]);

  if (isLoading) return <p>Loading tasks...</p>;

  return (
    <>
      <TaskForm />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TODO_STATUS.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={groupedTasks[status] || []}
            editTodo={editTodo}
            setEditTodo={setEditTodo}
            handleEdit={handleEdit}
            handleStatusUpdate={handleStatusUpdate}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </>
  );
};

const TaskColumn = ({ status, tasks, editTodo, setEditTodo, handleEdit, handleStatusUpdate, deleteTask }) => {
  const getStatusBackground = (status) => {
    switch (status) {
      case "Todo":
        return "bg-blue-100"; 
      case "In Progress":
        return "bg-yellow-100"; 
      case "Done":
        return "bg-green-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className={`p-4 rounded-md shadow-sm ${getStatusBackground(status)}`}>
      <h2 className="text-lg font-bold mb-4">{status}</h2>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          status={status}
          editTodo={editTodo}
          setEditTodo={setEditTodo}
          handleEdit={handleEdit}
          handleStatusUpdate={handleStatusUpdate}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

const TaskItem = ({ task, status, editTodo, setEditTodo, handleEdit, handleStatusUpdate, deleteTask }) => (
  <div className="p-4 border border-black rounded-md shadow-sm mb-4">
    <input
      className="w-full p-2 border rounded"
      onChange={(e) => setEditTodo({ ...editTodo, value: e.target.value })}
      disabled={editTodo.id !== task.id}
      value={editTodo.id === task.id ? editTodo.value : task.todo}
    />
     <div className="flex justify-between items-center mt-2">
      <select
        className="p-2 border border-gray-300 rounded-md"
        value={status}
        onChange={(e) => handleStatusUpdate(e.target.value, task)}
      >
        {TODO_STATUS.map((val) => (
          <option key={val} value={val}>{val}</option>
        ))}
      </select>
      <div>
      <Link           className="text-blue-500 mr-3"
 to={`/TaskBoard/${task.id}`}>View</Link>
        <button
          onClick={() => handleEdit(task.id, task.todo)}
          className="text-blue-500 mr-3"
        >
          {editTodo.id !== task.id ? "Edit" : "Save"}
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="text-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default TaskList;