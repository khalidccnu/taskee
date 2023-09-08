import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase.config.js";

export const getSomeUsers = createAsyncThunk(
  "auth/getSomeUsers",
  async ({ userIds }) => {
    const users = [];

    for (const userId of userIds) {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const user = {
          uid: docSnap.data().uid,
          displayName: docSnap.data().displayName,
        };
        users.push(user);
      }
    }

    return users;
  },
);

export const getUsers = createAsyncThunk("auth/getUsers", async () => {
  const collectionRef = collection(db, "users");
  const docSnap = await getDocs(collectionRef);
  const users = [];

  docSnap.forEach((doc) => {
    const user = {
      uid: doc.data().uid,
      displayName: doc.data().displayName,
    };
    users.push(user);
  });

  return users;
});
