import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../../context/TaskContext';
import { TTask } from '../../types/types';
import './TaskList.css';

const TaskList: React.FC = () => {
    const { fetchTasks, tasks, pagination, updateTask, deleteTask } = useTaskContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks(currentPage, statusFilter);
    }, [currentPage, statusFilter]);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleStatusChange = async (task: TTask) => {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed'; // Toggle status
        await updateTask(task.id, { ...task, status: newStatus }); // Update task with new status
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1);
    };

    const handleDeleteTask = async (taskId: number) => {

        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTask(taskId);
                fetchTasks(currentPage, statusFilter);
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };

    return (
        <div className="task-list-container">
            <h1>Task List</h1>

            <div className="filter-container">
                <label htmlFor="status-filter" className="filter-label">Filter by Status:</label>
                <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={handleFilterChange}
                    className="filter-select"
                >
                    <option value="">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                </select>
            </div>

            <table className="task-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task: TTask) => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>
                                <span
                                    onClick={() => handleStatusChange(task)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {task.status === 'completed' ? (
                                        <i className="fas fa-check-circle" style={{ color: 'green' }}></i>
                                    ) : (
                                        <i className="fas fa-times-circle" style={{ color: 'red' }}></i>
                                    )}
                                </span>
                            </td>
                            <td>{task.due_date}</td>
                            <td>
                                <button
                                    className="btn view-btn"
                                    onClick={() => navigate(`/task-details/${task.id}`)}
                                >
                                    View
                                </button>
                                <button
                                    className="btn edit-btn"
                                    onClick={() => navigate(`/update-task/${task.id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn delete-btn"
                                    onClick={() => handleDeleteTask(task.id)}
                                >
                                    Delete
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                {Array.from({ length: pagination.total_pages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TaskList;
