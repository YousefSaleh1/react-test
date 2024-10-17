import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TTask } from '../../types/types';
import './TaskDetails.css';
import axios from 'axios';

const TaskDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [task, setTask] = useState<TTask | null>(null);

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                axios.get(`http://127.0.0.1:8000/api/tasks/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                    .then((response) => {
                        setTask(response.data.data);
                    });
            } catch (error) {
                console.error('Error fetching task details:', error);
            }
        };

        fetchTaskDetails();
    }, [id]);

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div className="task-details-container">
            <h1>Task Details</h1>
            <div className="task-details-card">
                <h2>{task.title}</h2>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Status:</strong> {task.status === 'completed' ? 'Completed' : 'Pending'}</p>
                <p><strong>Due Date:</strong> {task.due_date}</p>
                <div className="task-actions">
                    <Link to={`/update-task/${task.id}`} className="edit-button">Edit Task</Link>
                    <Link to="/" className="back-button">Back to Task List</Link>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;
