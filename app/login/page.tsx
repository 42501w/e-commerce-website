"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import Cookies from "js-cookie";

export default function Page() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validationError, setValidationError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setUser((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const validateForm = () => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email);
    const passwordValid = user.password.length >= 8;

    if (!emailValid && emailTouched) {
      setValidationError("Invalid email format");
      return false;
    }
    if (!passwordValid && passwordTouched) {
      setValidationError("Password must be at least 8 characters");
      return false;
    }

    setValidationError("");
    return true;
  };

  useEffect(() => {
    const isFormValid = validateForm();
    setButtonDisabled(!isFormValid);
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await axios.post("/api/users/login", user, {
        withCredentials: true,
      });

      console.log("User logged in successfully", response.data);

      const token = Cookies.get("token");
      console.log("Token after login:", token);

      if (!token) {
        console.error("Token not found in cookies after login");
        setErrorMessage("Login failed. Please try again.");
        return;
      }

      router.push("/");
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data.message || "Failed to log in. Please try again.");
      } else if (error.request) {
        setErrorMessage("No response from the server. Please check your connection.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
      console.error("Failed to Log In", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
    if (!e.target.checked) {
      localStorage.removeItem("email");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full h-[350px] sm:h-[416px] bg-cover bg-center bg-opacity-70" style={{ backgroundImage: "url('/Rectangle 1.png')" }}>
        <div className="container mx-auto flex flex-col items-center justify-center h-full">
          <Image
            src={"/Meubel House_Logos-05.png"}
            height={77}
            width={77}
            alt="logo"
            className="mb-4"
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-center">
            My Account
          </h1>
          <div className="flex items-center mt-4">
            <a href="/" className="text-sm sm:text-base font-medium">
              Home
            </a>
            <MdKeyboardArrowRight size={20} className="mx-1" />
            <a href="/login" className="text-sm sm:text-base font-light">
              My Account
            </a>
          </div>
        </div>
      </section>

      {/* Login Form */}
      <div className="container mx-auto flex justify-center my-8 sm:my-16">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-4">
            {loading ? "We're logging you in" : "Log In"}
          </h1>

          {errorMessage && (
            <p className="text-red-500 text-center font-semibold">
              {errorMessage}
            </p>
          )}

          {validationError && (
            <p className="text-red-500 text-center font-semibold">
              {validationError}
            </p>
          )}

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="flex flex-col">
              <label htmlFor="email" className="font-medium text-base">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter Your Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                onBlur={() => setEmailTouched(true)}
                className="mt-2 p-3 rounded-lg border border-[#9F9F9F] focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="font-medium text-base">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter Your Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                onBlur={() => setPasswordTouched(true)}
                className="mt-2 p-3 rounded-lg border border-[#9F9F9F] focus:outline-none"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-[#9F9F9F]"
                checked={rememberMe}
                onChange={handleRememberMe}
              />
              <label htmlFor="rememberMe" className="ml-2 text-base font-normal">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className={`w-full p-3 rounded-lg text-white ${
                loading ? "bg-gray-400" : "bg-black"
              }`}
              disabled={buttonDisabled || loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="text-center mt-6 text-lg font-semibold text-[#777]">
            New?{" "}
            <a href="/sign-up" className="text-[#007bff] font-bold underline">
              Register Now!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}