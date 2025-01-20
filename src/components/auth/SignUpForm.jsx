"use client";
import React, { startTransition, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function SignUpForm() {
  const [showPass, setShowPass] = useState("password");
  const [showConfirmPass, setShowConfirmPass] = useState("password");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
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
    const { full_name, email, password, confirm_password } = formData;

    if (password !== confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    startTransition(async () => {
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ full_name, email, password }),
        });

        const result = await response.json();
        setLoading(false);

        if (!response.ok) {
          toast.error(result.message || "Something went wrong");
        } else {
          toast.success("Sign Up Successful");
          router.push("/");
        }
      } catch (error) {
        setLoading(false);
        toast.error("An error occurred. Please try again.");
      }
    });
  };

  const togglePasswordVisibility = (type, setter) => {
    setter((prev) => (prev === "password" ? "text" : "password"));
  };

  if (!isMounted) {
    return null; // Return null if the component is not mounted yet
  }

  return (
    <div className="flex items-center bg-[#041316] justify-center min-h-[100vh] py-12 bg-auth w-full">
      <div className="w-[300px] bg-[#044355] flex flex-col items-center justify-center text-white/90 rounded-[35px] sm:w-[440px] p-6  md:w-[450px] lg:w-[400px] mx-2 md:mx-0">
        <div className="flex flex-col items-center justify-center gap-y-4">
          <Link href="/">
            <Image src={""} alt="logo" className="w-[45px] md:w-[60px]" />
          </Link>
          <div className="text-lg font-bold text-center md:text-2xl">Sign Up</div>
          <div className="pt-1 pb-5 text-sm">Join us today!</div>
        </div>

        <form onSubmit={submitHandle} className="flex flex-col items-center justify-center w-full">
          <div className="w-full mb-4">
            <input
              type="text"
              id="full_name"
              name="full_name"
              placeholder="Full Name*"
              value={formData.full_name}
              onChange={handleChange}
              className="flex relative left-2 text-sm bg-[white] text-black transition-all duration-300 gap-x-4 px-4 items-center appearance-none focus:outline-none focus:shadow-outline w-[95%]  rounded-full py-[18px]"
              required
            />
          </div>

          <div className="w-full mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address*"
              value={formData.email}
              onChange={handleChange}
              className="flex relative left-2 text-sm bg-[white] text-black transition-all duration-300 gap-x-4 px-4 items-center appearance-none focus:outline-none focus:shadow-outline w-[95%]  rounded-full py-[18px]"
              required
            />
          </div>

          <div className="w-full mb-4">
            <div className="relative">
              <input
                type={showPass}
                placeholder="Password*"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="flex relative left-2 text-sm bg-[white] text-black transition-all duration-300 gap-x-4 px-4 items-center appearance-none focus:outline-none focus:shadow-outline w-[95%]  rounded-full py-[18px] mb-3"
                required
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  togglePasswordVisibility(showPass, setShowPass);
                }}
                className="absolute inset-y-0 text-black w-[38px] right-3 flex items-center px-2 focus:outline-none"
              >
                {showPass === "password" ? (
                  <IoIosEyeOff className="text-[20px]" />
                ) : (
                  <IoIosEye className="text-[20px]" />
                )}
              </button>
            </div>
          </div>

          <div className="w-full mb-4">
            <div className="relative">
              <input
                type={showConfirmPass}
                placeholder="Confirm Password*"
                id="confirm_password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                className="flex relative left-2 text-sm bg-[white] text-black transition-all duration-300 gap-x-4 px-4 items-center appearance-none focus:outline-none focus:shadow-outline w-[95%]  rounded-full py-[18px] mb-3"
                required
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  togglePasswordVisibility(showConfirmPass, setShowConfirmPass);
                }}
                className="absolute inset-y-0 text-black w-[38px] right-3 flex items-center px-2 focus:outline-none"
              >
                {showConfirmPass === "password" ? (
                  <IoIosEyeOff className="text-[20px]" />
                ) : (
                  <IoIosEye className="text-[20px]" />
                )}
              </button>
            </div>
          </div>

          <button className="flex bg-[#167f8f] hover:bg-[#10626e] transition-all duration-300 gap-x-2 px-4 items-center w-[95%] text-center justify-center rounded-full py-3 mb-3 font-semibold">
            {loading && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
            Sign Up
          </button>

          <div className="flex items-center justify-center text-sm text-white gap-x-4">
            Already have an account? <Link href="/auth/sign-in">Signn In</Link>
          </div>

          
      
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
