import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault(); 
    setError('');

    try {
      const response = await fetch('https://task-api-eight-flax.vercel.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), 
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Server is down. Try again later.');
    }
  };

    return (
 <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 md:p-12">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-500">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="name@company.com"
              className="w-full px-4 py-3 rounded-xl text-black border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl text-black border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-green-900 hover:bg-green-950 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
          >
            Sign In
          </button>
          
        </form>

        <p className="text-center text-slate-500 mt-8 text-sm">
          Don't have an account? <span className="text-green-900 font-semibold cursor-pointer">Contact Admin</span>
        </p>
      </div>
    </div>
);
};

export default Login;