import { useEffect, useState } from 'react';
import { toast } from 'sonner';



import { Eye, EyeOff } from "lucide-react";
import Loading from '~/components/Loading';
import type { Route } from './+types/login';
import { loginWithEmail, useAuthListener } from '~/lib/firebase/auth';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "ADMIN LOGIN - CREATIVE TOUR GURU" },
   
  ];
}

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    const savedEmail = localStorage.getItem('admin_email');
    const savedPass = localStorage.getItem('admin_password') || "";
    if (savedEmail) {
      setEmail(savedEmail);
      setPassword(savedPass);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);


    if (rememberMe) {
      localStorage.setItem('admin_email', email);
      localStorage.setItem('admin_password', password);
    } else {
      localStorage.removeItem('admin_email');
      localStorage.removeItem('admin_password');
    }

    const result: any = await loginWithEmail({ email, password, rememberMe });

    if (result?.errorCode) {
      toast(`Login failed: ${result.errorMessage}`);
    } else {
      toast("Login successfully");
    }

    setIsLoading(false);
  };

  useAuthListener();


  return (
    <div className="flex h-screen w-full ">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="/logo/logo.jpg"
          alt="creative tour guru logo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-10 left-10 text-white">
          <h2 className="text-4xl font-bold tracking-wider">CREATIVE TOUR GURU</h2>
          <p className="text-sm tracking-widest mt-2">ADMIN PORTAL</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-500">Sign in to access the admin dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                placeholder="example@email.com"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
                placeholder="••••••••"
              />

              <button
                type="button"
                onClick={() => {setShowPassword(!showPassword)}}
                className="absolute right-3 top-11 opacity-60 z-99 cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>


            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-black"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              {/* <a href="#" className="text-sm text-gray-900 hover:underline">
                Forgot password?
              </a> */}
            </div>

            

            <button
              disabled={isLoading}
              type='submit'
              className="w-full bg-black text-white py-3 font-medium
              justify-center items-center
              hover:bg-gray-800 transition duration-200"
            >
              {/* <Loading />  */}
              {isLoading ? <Loading /> : "Sign In"}
            </button>

          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Protected by enterprise security
          </div>
        </div>
      </div>
    </div>
  );
}