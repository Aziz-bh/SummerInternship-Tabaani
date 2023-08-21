import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import uploadFile from "../utils/uploadFile";

function useSignUp() {
  const navigate = useNavigate();

  const signUp = async (
    fullName,
    email,
    password,
    confirmPassword,
    profilePicture,
    setUploadProgress
  ) => {
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (profilePicture) {
        const profilePictureURL = await uploadFile(
          profilePicture,
          setUploadProgress
        );
        await updateProfile(user, {
          displayName: fullName,
          photoURL: profilePictureURL,
        });
      } else {
        await updateProfile(user, {
          displayName: fullName,
        });
      }

      console.log("User registered:", user);
      navigate("/auth/sign-in");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing up:", errorMessage);
    }
  };

  return signUp;
}

export default useSignUp;
