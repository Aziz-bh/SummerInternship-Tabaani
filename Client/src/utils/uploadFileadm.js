import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/firebase";
import { v4 } from "uuid";

const uploadFilead = async (file, setUploadProgress) => {
  const fileName = v4();
  const storageRef = ref(storage, `image/${fileName}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  // Set up event listener for upload progress
  uploadTask.on("state_changed", (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setUploadProgress(progress);
  });

  // get image url
  await uploadTask;
  return await getDownloadURL(storageRef);
};

export default uploadFilead;
