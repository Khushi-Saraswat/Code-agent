"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiShield, FiMail, FiLock } from "react-icons/fi";


const LoginPage = () => {
  const router = useRouter();
  const [error,setError] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

 
  const handleLogin = async(e:any)=>{

    e.preventDefault();
    setError('');
    setLoading(true);

    try{

     const res = await fetch('http://localhost:8080/api/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({email,password})
     
    });
      
      if(res.ok){
        const data = await res.json();
         
        if (data && data.idToken) {
            localStorage.setItem('idToken', data.idToken);
            console.log("Login success, token stored");
            router.push("/review-dashboard");
        } else {
            setError("Server response missing token.");
        }

      } else {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.message || "Invalid credentials.");
      }

    }catch(err:any){
       
      setError(err.message);
    }finally{
      setLoading(false);
    }

    

    
  }

   return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#08111f] px-4 text-white overflow-hidden">
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(14,165,233,0.15),_transparent_36%,_rgba(236,72,153,0.12)_82%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,_rgba(45,212,191,0.15),_transparent_32%),radial-gradient(circle_at_78%_28%,_rgba(168,85,247,0.14),_transparent_30%)]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="flex flex-col items-center">
          <Link href="/" className="mb-10 flex items-center gap-3 transition-transform hover:scale-105">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-500/40 shadow-lg shadow-cyan-500/10">
              <FiShield className="text-2xl" />
            </span>
            <span className="text-2xl font-bold tracking-tight">AI Audit</span>
          </Link>

          <div className="w-full rounded-3xl border border-white/10 bg-slate-900/40 p-10 shadow-2xl backdrop-blur-xl">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold tracking-tight">Welcome Back</h1>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Enter your credentials to access your review dashboard.
              </p>
              {error && <p className="mt-4 text-xs text-red-400 bg-red-500/10 py-2 rounded-lg border border-red-500/20">{error}</p>}
            </div>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <div className="space-y-4">
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full rounded-xl border border-white/10 bg-slate-800/50 py-3 pl-12 pr-4 text-sm outline-none transition-all focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 placeholder:text-slate-600"
                  />
                </div>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full rounded-xl border border-white/10 bg-slate-800/50 py-3 pl-12 pr-4 text-sm outline-none transition-all focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 placeholder:text-slate-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-cyan-600 py-3 font-semibold shadow-lg shadow-cyan-900/20 transition-all hover:bg-cyan-500 active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? "Authenticating..." : "Sign In"}
              </button>
            </form>

          
                   <div className="mt-8 text-center">

                         <p className="text-slate-500 text-sm">

                                Create an account?{' '}
                               
                                <Link href="/register" className="text-blue-600 font-bold hover:underline underline-offset-4">

                                    Sign Up

                                </Link>

                         </p>

                   </div>



            <div className="mt-8 flex items-center gap-4 text-slate-700">
              <div className="h-px flex-1 bg-white/5"></div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Or</span>
              <div className="h-px flex-1 bg-white/5"></div>
            </div>

            
          </div>

          <Link href="/" className="mt-10 text-sm text-slate-500 transition-colors hover:text-slate-300">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
};
export default LoginPage;
