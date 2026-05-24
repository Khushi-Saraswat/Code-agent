'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiShield } from "react-icons/fi";
import axios from 'axios';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
    
        email: '',
        password: '',
        confirmPassword: ''
    });

    const[error,setError]=useState('');
    const[loading,setLoading]=useState(false);
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);


        // logic for Axios will be implemented by the user here
        try{
                const res = await fetch('http://localhost:8080/api/register',{
                     method:'POST',
                     headers:{
                                 'Content-Type':'application/json'
                     },
                     body:JSON.stringify(formData)
                });

                if(res.ok){
                    
                    const data = await res.json();
                    console.log("Response Data:", data);

                    if (data && data.idToken) {
                        localStorage.setItem('idToken', data.idToken);
                        console.log("Token stored successfully");
                        router.push("/review-dashboard");
                    } else {
                        setError("Registration successful but no token received.");
                    }

                } else {
                    const errorData = await res.json().catch(() => ({}));
                    setError(errorData.message || "Registration failed. Please check your inputs.");
                }
        }catch(err:any){
                    console.error("Network Error:", err);
                    setError(err.message);
        }finally{
                    setLoading(false);
        }

        
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#08111f] relative overflow-hidden px-4 text-white">
            {/* Dynamic Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(14,165,233,0.15),_transparent_36%,_rgba(236,72,153,0.12)_82%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,_rgba(45,212,191,0.15),_transparent_32%),radial-gradient(circle_at_78%_28%,_rgba(168,85,247,0.14),_transparent_30%)]" />
            </div>

            <div className="relative z-10 w-full max-w-md flex flex-col items-center">
                <Link href="/" className="mb-10 flex items-center gap-3 transition-transform hover:scale-105">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-500/40 shadow-lg shadow-cyan-500/10">
                        <FiShield className="text-2xl" />
                    </span>
                    <span className="text-2xl font-bold tracking-tight text-white">AI Audit</span>
                </Link>

                <div className="w-full rounded-3xl border border-white/10 bg-slate-900/40 p-10 shadow-2xl backdrop-blur-xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">Create Account</h1>
                        <p className="text-slate-400 mt-2">Join AI Code Reviewer today</p>
                        {error && <div className="mt-4 p-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs font-medium">{error}</div>}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1">
                            <label htmlFor="email" className="text-sm font-semibold text-slate-400 ml-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="john@example.com"
                                required
                                className="w-full rounded-xl border border-white/10 bg-slate-800/50 py-3 px-4 text-sm outline-none transition-all focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 placeholder:text-slate-600 text-white"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="password" className="text-sm font-semibold text-slate-400 ml-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                required
                                className="w-full rounded-xl border border-white/10 bg-slate-800/50 py-3 px-4 text-sm outline-none transition-all focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 placeholder:text-slate-600 text-white"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-400 ml-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="••••••••"
                                required
                                className="w-full rounded-xl border border-white/10 bg-slate-800/50 py-3 px-4 text-sm outline-none transition-all focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 placeholder:text-slate-600 text-white"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-cyan-600 py-3 font-semibold shadow-lg shadow-cyan-900/20 transition-all hover:bg-cyan-500 active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? "Creating Account..." : "Sign Up"}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-400">
                        Already have an account?{" "}
                        <Link href="/login" className="text-cyan-400 hover:underline">Log in</Link>
                    </p>
                   
                </div>

                <Link href="/" className="mt-10 text-sm text-slate-500 transition-colors hover:text-slate-300">
                    Back to home
                </Link>
            </div>
        </div>
    );
};

export default RegisterPage;
