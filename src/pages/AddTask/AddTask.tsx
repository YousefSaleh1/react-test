import './AddTask.css'
import { useTaskContext } from '../../context/TaskContext';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../../components/TaskForm/TaskForm';
import { TTask } from '../../types/types';

const AddTask = () => {
    const { addTask } = useTaskContext();
    const navigate = useNavigate();
  
    const handleAddTask = async (taskData: Omit<TTask, 'id'>) => {
      await addTask(taskData);
      navigate('/');
    };
  
    return (
      <div>
        <h1>Add Task</h1>
        <TaskForm onSubmit={handleAddTask} />
      </div>
    );
}

export default AddTask