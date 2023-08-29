import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user, "usssssssssssssssss");
      const token = await user.getIdToken();
      console.log("token", token);

      localStorage.setItem("userToken", token);

      const response = await fetch(
        `http://localhost:5000/api/get-user-role/${user.uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      // Storing user data in localStorage (if needed)
      localStorage.setItem("user", JSON.stringify(user));

      const userRole = data.role;

      if (userRole === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(true);
    }
  };

  return (
    <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <form
        className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0"
        onSubmit={handleLogin}
      >
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>
        <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign In with Google
          </h5>
        </div>
        <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white">or</p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>
        <div className="mb-5 flex flex-col gap-4">
          <input
            id="email"
            type="text"
            placeholder="email"
            className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none "
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id="password"
            type="password"
            placeholder="password"
            className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none "
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
            <Checkbox />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
              Keep me logged In
            </p>
          </div>
          <a
            className="text-sm font-medium text-yellow-500 hover:text-yellow-600 dark:text-white"
            href=" "
          >
            Forgot Password?
          </a>
        </div>
        <button
          className="linear mt-2 w-full rounded-xl bg-yellow-500 py-[12px] text-base font-medium text-white transition duration-200 dark:bg-yellow-500 dark:text-white"
          onSubmit={handleLogin}
        >
          Sign In
        </button>
        <div className="mt-4">
          <span className="text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet?
          </span>
          <a
            href="/auth/sign-up"
            className="ml-1 text-sm font-medium text-yellow-500 hover:text-yellow-600 dark:text-white"
          >
            Create an account
          </a>
        </div>
        {error && (
          <span className="text-red-500">wrong email or password!</span>
        )}
      </form>
    </div>
  );
}
