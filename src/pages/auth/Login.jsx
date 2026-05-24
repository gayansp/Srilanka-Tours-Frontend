import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const result = await api.post("auth/login", {
                email,
                password
            });

            localStorage.setItem("token", result.data.token);
            localStorage.setItem("role", result.data.role);

            if (result.data.role === 'admin') {
                navigate('/adminDashboard');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error("Login failed:", error);
            setError(error.response?.data?.message || "Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-image-section">
                <div className="login-image-overlay"></div>
                <div className="login-image-content">
                    <h1 className="login-image-title">Discover the Magic of Sri Lanka</h1>
                    <p className="login-image-subtitle">Log in to manage your bookings, explore exclusive destinations, and plan your unforgettable journey.</p>
                </div>
            </div>
            
            <div className="login-form-section">
                <div className="login-form-wrapper">
                    <div className="login-logo">
                        <Link to="/">
                            <img src="/images/udawalawe_tours_hq(2).png" alt="Lanka Tours" />
                        </Link>
                    </div>
                    
                    <h2 className="login-title">Welcome Back</h2>
                    <p className="login-subtitle">Please enter your details to sign in.</p>

                    <form className="login-form" onSubmit={handleLogin}>
                        {error && <div className="login-error">{error}</div>}
                        
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="Enter your email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                placeholder="Enter your password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>
                        
                        <button type="submit" className="btn-login" disabled={loading}>
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>

                    <div className="login-footer">
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;