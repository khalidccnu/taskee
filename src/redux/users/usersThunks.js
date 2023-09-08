import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase.config.js";

export const getUsers = createAsyncThunk("auth/getUsers", async () => {
  const docRef = collection(db, "users");
  const docSnap = await getDocs(docRef);
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
