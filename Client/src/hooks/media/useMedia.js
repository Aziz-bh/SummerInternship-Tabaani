import { useCallback } from "react";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useAuthentification } from "../auth";

export const useMedia = () => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const { userId } = useAuthentification();
  const uploadMedia = useCallback(
    async ({ path, file }) => {
      const { uploadTaskSnapshot } = await firebase.uploadFile(path, file);
      const ref = firebase.storage().ref(uploadTaskSnapshot.metadata.fullPath);
      const url = await ref.getDownloadURL();
      const dirtyMetadata = await ref.getMetadata();
      const metadata = JSON.parse(
        JSON.stringify({
          ...dirtyMetadata,
          terms: dirtyMetadata.fullPath.split("/"),
        })
      ); // remove undefined fields;

      return firestore
        .collection("media")
        .add({ url, metadata, createdBy: userId });
    },
    [firebase, firestore, userId]
  );
  const uploadMedias = useCallback(
    async ({ path, files }) => {
      const batch = firestore.batch();
      const uploads = await firebase.uploadFiles(path, files);
      const filesRefs = [];
      for (const upload of uploads) {
        const ref = firebase
          .storage()
          .ref(upload.uploadTaskSnapshot.metadata.fullPath);
        const url = await ref.getDownloadURL();
        const dirtyMetadata = await ref.getMetadata();
        const metadata = JSON.parse(
          JSON.stringify({
            ...dirtyMetadata,
            terms: dirtyMetadata.fullPath.split("/"),
          })
        ); // remove undefined fields;
        filesRefs.push({ url, metadata, createdBy: userId });
      }

      filesRefs.map((doc) => {
        const docRef = firestore.collection("media").doc(); //automatically generate unique id
        batch.set(docRef, doc);
        return docRef;
      });
      batch.commit();
      return filesRefs;
    },
    [firebase, firestore, userId]
  );

  const deleteMedia = useCallback(
    async ({ url }) => {
      const ref = firebase.storage().refFromURL(url);
      const mediaToDelete = await firestore
        .collection("media")
        .where("url", "==", url)
        .get();
      mediaToDelete.forEach((media) => media.ref.delete());
      ref.delete();
    },
    [firebase, firestore]
  );

  const getMediaData = useCallback(
    async (docPath) => {
      const ref = await firestore.doc(docPath).get();
      return ref.data();
    },
    [firestore]
  );

  return {
    uploadMedia,
    uploadMedias,
    getMediaData,
    deleteMedia,
  };
};
