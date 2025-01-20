"use client";
import React, { startTransition, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const [showpass, setShowPass] = useState("password");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



    const submitHandle = async (e) => {
    e.preventDefault();
    setLoading(true);
    startTransition(async () => {
      const res = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      setLoading(false);


      if (res?.error) {
        toast.error(res?.error);
        setLoading(false);
      } else {
        router.push('/'); // Redirect to your protected page
        toast.success("Login Successfully");
      }
    });
  };

  const showHidePass = (e) => {
    e.preventDefault();
    setShowPass((prev) => (prev === "password" ? "text" : "password"));
  };

  if (!isMounted) {
    return null; // Return null if the component is not mounted yet
  }

  return (
    <div  className="flex items-center bg-[#041316] justify-center min-h-[100vh] py-12 bg-auth w-full">
      <div  className="w-[300px] bg-[#044355] flex flex-col items-center justify-center text-white/90 rounded-[35px] sm:w-[440px] p-6  md:w-[450px] lg:w-[400px] mx-2 md:mx-0">
        <div  className="flex flex-col items-center justify-center gap-y-4">
          {/* <Link href="/">
            <Image src={''} alt="logo" className="w-[45px] md:w-[60px]" />
          </Link> */}
          <div className="text-lg font-bold text-center md:text-2xl">
            Log in
          </div>
          <div className="pt-1 pb-5 text-sm">You&apos;re almost there...</div>
        </div>
       
       
        <form onSubmit={submitHandle} className="flex flex-col items-center justify-center w-full">
          <div  className="w-full mb-4">
          
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address*"
              value={formData.email}
              onChange={handleChange}
               className="flex relative left-2 text-sm bg-[white] text-black transition-all duration-300 gap-x-4 px-4 items-center appearance-none focus:outline-none focus:shadow-outline w-[95%]  rounded-full py-[18px] "
              required
            />
          </div>
          <div  className="w-full mb-1" >
          
            <div  className="relative ">

              <input
                type={showpass}
                placeholder="Password*"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="flex relative left-2 text-sm bg-[white] text-black transition-all duration-300 gap-x-4 px-4 items-center appearance-none focus:outline-none focus:shadow-outline w-[95%]  rounded-full py-[18px] mb-3"
                
                required
              />
              <button
                onClick={showHidePass}
                className="absolute inset-y-0 text-black w-[38px] right-3 flex items-center px-2  focus:outline-none"
              >
                {showpass === "password" ? <IoIosEyeOff className="text-[20px]"/> : <IoIosEye className="text-[20px]"/>}
              </button>
            </div>
          </div>
       
          

            <button className="flex bg-[#167f8f] hover:bg-[#10626e] transition-all duration-300 gap-x-2 px-4 items-center w-[95%] text-center justify-center rounded-full py-3 mb-3 font-semibold">
             {loading && (
             <Loader2 className="w-4 h-4 mr-1 animate-spin" />
             )}
            Continue
           
          </button>

          <div  className="text-xs text-center text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup">
              <span className="text-blue-500">Sign up</span>
            </Link>
          </div>
         
        
        </form>
      </div>
    </div>
  );
}

export default SignInForm;
