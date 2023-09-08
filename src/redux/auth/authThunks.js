import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "../../utils/firebase.config.js";
import { setFBUnHold, setUserLoading } from "./authSlice";

const createUser = async (values) => {
  const docRef = doc(db, "users", values.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) return "User exist!";
  return setDoc(doc(db, "users", values.uid), {
    ...values,
    timeStamp: serverTimestamp(),
  });
};

export const signInWithEP = createAsyncThunk(
  "auth/signInWithEP",
  async ({ values }, thunkAPI) => {
    thunkAPI.dispatch(setUserLoading(true));

    const { email, password } = values;

    const userCred = await signInWithEmailAndPassword(auth, email, password);

    thunkAPI.dispatch(setFBUnHold(true));
    return userCred;
  },
);

export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUserLoading(true));

    const userCred = await signInWithPopup(auth, googleProvider);
    await createUser({
      uid: userCred.user.uid,
      displayName: userCred.user.displayName,
    });

    thunkAPI.dispatch(setFBUnHold(true));
    return userCred;
  },
);

export const createUserWithEP = createAsyncThunk(
  "auth/createUserWithEP",
  async ({ values }, thunkAPI) => {
    thunkAPI.dispatch(setUserLoading(true));

    const { name, email, password, userImg } = values;
    const formData = new FormData();
    formData.append("userImg", userImg);

    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await axios
      .post(`${import.meta.env.VITE_API_URL}/users/upload`, formData)
      .then((response) =>
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: response.data.filePath,
        }).then(() =>
          createUser({
            uid: userCred.user.uid,
            displayName: userCred.user.displayName,
          }),
        ),
      );

    thunkAPI.dispatch(setFBUnHold(true));
    return userCred;
  },
);

export const logOut = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
  thunkAPI.dispatch(setUserLoading(true));

  return signOut(auth);
});
