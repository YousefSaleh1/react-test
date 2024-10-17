import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import axios from 'axios';
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/login', { email, password })
            .then(response => {
                const token = response.data.access_token;
                localStorage.setItem('token', token);

                navigate('/');
                alert(response.data.message);
            })
            .catch(error => {
                console.error('Login error:', error);
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label>Email address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label>Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>

                <div className="text-center mt-3">
                    <p>Don't have an account?</p>
                    <Link to="/register" className="btn btn-link">Register here</Link>
                </div>
            </div>
        </div>
    );
}

export default Login