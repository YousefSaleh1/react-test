import { Route, Routes } from 'react-router-dom';
import './App.css'
import TaskList from './pages/TaskList/TaskList';
import AddTask from './pages/AddTask/AddTask';
import UpdateTask from './pages/UpdateTask/UpdateTask';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar/Navbar';
import { TaskProvider } from './context/TaskContext';
import TaskDetails from './pages/TaskDetails/TaskDetails';

function App() {
  const token = localStorage.getItem('token');

  return (
    <>
      <TaskProvider>
        {token && <Navbar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute element={<TaskList />} />} />
          <Route path="/add-task" element={<ProtectedRoute element={<AddTask />} />} />
          <Route path="/task-details/:id" element={<ProtectedRoute element={<TaskDetails />} />} />
          <Route path="/update-task/:id" element={<ProtectedRoute element={<UpdateTask />} />} />
        </Routes>
      </TaskProvider>
    </>
  )
}

export default App
