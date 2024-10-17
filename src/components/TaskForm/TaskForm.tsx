import React, { useEffect, useState } from 'react';
import './TaskForm.css'; 
interface Task {
    title: string;
    description: string;
    status: string;
    due_date: string;
}

interface TaskFormProps {
    initialData?: Task;
    onSubmit: (task: Omit<Task, 'id'>) => Promise<void>;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSubmit }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [status, setStatus] = useState(initialData?.status || 'pending');
    const [dueDate, setDueDate] = useState(initialData?.due_date || '');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit({ title, description, status, due_date: dueDate });
        setLoading(false);
    };

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
            setStatus(initialData.status);
            setDueDate(initialData.due_date);
        }
    }, [initialData]);

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="form-input"
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="form-textarea"
            />
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select">
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>
            <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="form-date"
            />
            <button type="submit" disabled={loading} className="form-button">
                {loading ? 'Processing...' : (initialData ? 'Update Task' : 'Add Task')}
            </button>
        </form>
    );
};

export default TaskForm;
