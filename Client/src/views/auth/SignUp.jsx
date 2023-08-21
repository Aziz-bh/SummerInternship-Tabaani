import React, { useState } from "react";
import UseSignUp from "../../hooks/authHook";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const signUp = UseSignUp();

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      await signUp(
        fullName,
        email,
        password,
        confirmPassword,
        profilePicture,
        setUploadProgress
      );
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };
  return (
    <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <form
        onSubmit={handleSignUp}
        className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0"
      >
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign Up
        </h4>

        <div className="mb-5 flex flex-col gap-4">
          <input
            id="fullName"
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-2 h-12 w-full rounded-xl border p-3 text-sm outline-none"
          />
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 h-12 w-full rounded-xl border p-3 text-sm outline-none"
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 h-12 w-full rounded-xl border p-3 text-sm outline-none"
          />
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-2 h-12 w-full rounded-xl border p-3 text-sm outline-none"
          />
          <input
            id="profilePicture"
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])}
            className="mt-2 h-12 w-full rounded-xl border p-3 text-sm outline-none"
          />
          <p>image upload progress : {uploadProgress}%</p>
        </div>

        <button
          type="submit"
          className="linear mt-2 w-full rounded-xl bg-yellow-500 py-[12px] text-base font-medium text-white transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
