import { useParams, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../../context/TaskContext';
import { TTask } from '../../types/types';
import TaskForm from '../../components/TaskForm/TaskForm';

const UpdateTask = () => {
    const { id } = useParams<{ id: string }>();
    const { tasks, updateTask } = useTaskContext();
    const navigate = useNavigate();

    const task = tasks.find((task) => task.id === Number(id));

    const handleUpdateTask = async (taskData: Omit<TTask, 'id'>) => {
        await updateTask(Number(id), taskData);
        navigate('/');
    };

    return (
        <div>
            <h1>Update Task</h1>
            {task ? (
                <TaskForm initialData={task} onSubmit={handleUpdateTask} />
            ) : (
                <p>Task not found</p>
            )}
        </div>
    );
};

export default UpdateTask;
