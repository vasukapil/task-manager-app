import { useNavigate, useParams } from "react-router-dom";
import { useFetchTasksQuery } from "../features/tasks/apiSlice";

const TaskDetails = () => {
  const { id } = useParams(); 
  const { data: tasks, isLoading } = useFetchTasksQuery(); 
  const navigate = useNavigate()

  if (isLoading) return <p>Loading task details...</p>;

  const task = tasks?.todos?.find((task) => task.id === Number(id));

  if (!task) return <p>Task not found</p>;

  return (
    <>
    <div className="p-4 border rounded-md shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Task Details</h2>
      <p>
        <strong>Task ID:</strong> {task.id}
      </p>
      <p>
        <strong>Task:</strong> {task.todo}
      </p>
      <p>
        <strong>Status:</strong> {task.completed ? "Done" : (task.inProgress ? "In Progress" : "Todo")}
      </p>
    </div>
    <button className="ml-2 p-2 bg-blue-500 text-white rounded my-4 block !mx-auto" onClick={()=>navigate('/TaskBoard')}>Back</button>
    </>
  );
};

export default TaskDetails;
