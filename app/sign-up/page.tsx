"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function SignUpPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const onSignUp = async () => {
    if (buttonDisabled) return;
    try {
      setLoading(true);
      const response = await axios.post("/api/users/sign-up", user);
      console.log("User signed up successfully", response.data);

      // Clear form after sign-up and redirect to login
      setUser({ username: "", email: "", password: "" });
      router.push("/login");
    } catch (error: any) {
      console.log("Failed to Sign Up", error.message);
      setErrorMessage("Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const emailValid = user.email.includes("@");
    const passwordValid = user.password.length >= 8;


    if (user.username.length > 0 && emailValid && passwordValid) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <section className="flex justify-center">
      <div className="max-w-lg w-full h-auto ml-9">
        <h1 className="font-semibold text-4xl ml-20 mt-10">
          {loading ? "Processing...." : "Sign Up"}
        </h1>

        <p className="ml-20 mt-8">
          <label htmlFor="username" className="font-medium text-base">Username</label> <br />
          <input
            id="username"
            type="text"
            placeholder="Enter Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="mt-7 h-[70px] rounded-[10px] w-[350px] border-[#9F9F9F] border-2 focus:outline-none pl-3"
            required
          />
        </p>

        <p className="ml-20 mt-8">
          <label htmlFor="email" className="font-medium text-base">Email address</label> <br />
          <input
            id="email"
            type="email"
            placeholder="Enter Your Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="mt-7 h-[70px] rounded-[10px] w-[350px] border-[#9F9F9F] border-2 focus:outline-none pl-3"
            required
          />
        </p>

        <p className="ml-20 mt-8">
          <label htmlFor="password" className="font-medium text-base">Password</label> <br />
          <input
            id="password"
            type="password"
            placeholder="Enter Your Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="mt-7 h-[70px] rounded-[10px] w-[350px] border-[#9F9F9F] border-2 focus:outline-none pl-3"
            required
          />
        </p>

        {errorMessage && (
          <p className="text-red-500 ml-20 mt-4">{errorMessage}</p>
        )}

        <button
          onClick={onSignUp}
          className="border rounded-[13px] w-[200px] h-[60px] mt-[60px] ml-20 border-black font-normal text-xl mb-4"
          disabled={buttonDisabled || loading}
        >
          {loading ? "Registering..." : buttonDisabled ? "Sign Up" : "Register Now"}
        </button>

        <Link href="/login">
        <a className="underline mt-10 ml-3 text-lg font-semibold text-[#777]">Already account?<span className="text-[#007bff] font-bold underline">
                Login!
              </span></a> </Link>
      </div>
    </section>
  );
}

export default SignUpPage;
