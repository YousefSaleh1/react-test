import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { TPagination, TTask } from '../types/types';

interface TaskContextType {
    tasks: TTask[];
    pagination: TPagination;
    fetchTasks: (page: number, status?: string) => void;
    addTask: (task: Omit<TTask, 'id'>) => Promise<void>;
    updateTask: (id: number, task: Omit<TTask, 'id'>) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<TTask[]>([]);
    const [pagination, setPagination] = useState<TPagination>({
        total: 0,
        count: 0,
        per_page: 0,
        current_page: 0,
        total_pages: 0,
    });

    const fetchTasks = useCallback(async (page: number, status?: string) => {
        const url = `http://127.0.0.1:8000/api/tasks?page=${page}${status ? `&status=${status}` : ''}`;

        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        
        setTasks(response.data.data);
        setPagination(response.data.pagination);
    }, []);

    useEffect(() => {
        fetchTasks(1); 
    }, [fetchTasks]);

    const addTask = async (task: Omit<TTask, 'id'>) => {
        await axios.post('http://127.0.0.1:8000/api/tasks', task, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        fetchTasks(pagination.current_page);
    };

    const updateTask = async (id: number, task: Omit<TTask, 'id'>) => {
        const formData = new FormData();

        formData.append('title', task.title);
        formData.append('description', task.description);
        formData.append('status', task.status);
        formData.append('due_date', task.due_date);

        formData.append('_method', 'PUT');

        await axios.post(`http://127.0.0.1:8000/api/tasks/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        fetchTasks(pagination.current_page);
    };

    const deleteTask =  async (id: number) => {
        await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        fetchTasks(pagination.current_page);
    };

    return (
        <TaskContext.Provider value={{ tasks, pagination, fetchTasks, addTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};
