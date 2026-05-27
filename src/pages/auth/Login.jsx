import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';

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
                navigate('/admin');
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
        <div className="flex min-h-screen w-screen m-0 p-0 font-sans bg-slate-50 max-md:flex-col">
            {/* Image banner section */}
            <div className="flex-[1.2] bg-[url('https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center relative flex flex-col justify-end p-16 text-white max-md:hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a2a]/90 via-[#1a3a2a]/30 to-black/10 z-10" />
                <div className="relative z-20 text-left">
                    <h1 className="font-playfair text-[3.5rem] font-bold mb-4 leading-tight text-white">Discover the Magic of Sri Lanka</h1>
                    <p className="text-[1.1rem] font-normal opacity-90 max-w-[80%] leading-relaxed text-slate-200">Log in to manage your bookings, explore exclusive destinations, and plan your unforgettable journey.</p>
                </div>
            </div>

            {/* Form section */}
            <div className="flex-1 flex flex-col justify-center items-center p-8 bg-white max-md:px-6 max-md:py-8 max-md:min-h-screen">
                <div className="w-full max-w-[400px]">
                    <div className="mb-8 text-center">
                        <Link to="/">
                            <img src="/images/udawalawe_tours_hq(2).png" alt="Lanka Tours" className="h-[70px] object-contain mx-auto" />
                        </Link>
                    </div>

                    <h2 className="font-playfair text-[2rem] text-primary mb-2 text-left">Welcome Back</h2>
                    <p className="text-slate-500 mb-8 text-[0.95rem] text-left">Please enter your details to sign in.</p>

                    <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                        {error && <div className="text-red-600 bg-red-50 border border-red-400 p-3 rounded-lg text-sm text-left">{error}</div>}

                        <div className="flex flex-col gap-2 text-left">
                            <label htmlFor="email" className="text-sm font-medium text-primary">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="py-3.5 px-4 border border-slate-200 rounded-lg font-sans text-base transition-all duration-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-accent focus:bg-white focus:shadow-[0_0_0_3px_rgba(217,119,6,0.1)]"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2 text-left">
                            <label htmlFor="password" className="text-sm font-medium text-primary">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="py-3.5 px-4 border border-slate-200 rounded-lg font-sans text-base transition-all duration-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-accent focus:bg-white focus:shadow-[0_0_0_3px_rgba(217,119,6,0.1)]"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="bg-accent text-white p-3.5 border-none rounded-lg font-sans text-base font-semibold cursor-pointer transition-all duration-200 mt-2 enabled:hover:bg-accent-hover enabled:hover:-translate-y-[1px] disabled:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-70" 
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-500">
                        Don't have an account? <Link to="/register" className="text-accent no-underline font-medium transition-colors duration-200 hover:text-accent-hover">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;