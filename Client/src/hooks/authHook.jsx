import { auth, db } from "../config/firebase";
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
      // Create user using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      let profilePictureURL = null;

      // Handle profile picture upload and update profile
      if (profilePicture) {
        try {
          profilePictureURL = await uploadFile(
            profilePicture,
            setUploadProgress
          );
          await updateProfile(user, {
            displayName: fullName,
            photoURL: profilePictureURL,
          });
        } catch (uploadError) {
          console.error("Error uploading profile picture:", uploadError);
        }
      } else {
        await updateProfile(user, {
          displayName: fullName,
        });
      }

      // Update user profile data in Firestore
      const usersCollection = db.collection("users");
      const userProfileData = {
        displayName: fullName,
        email: user.email,
        photoURL: profilePictureURL,
        role: "user",
      };
      await usersCollection.doc(user.uid).set(userProfileData);

      console.log("user registered:", user);
      navigate("/auth/sign-in");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing up:", errorMessage);
      // Handle the error, e.g., show a message to the user
    }
  };

  return signUp;
}

export default useSignUp;
