import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../../utils/firebase.config.js";
import { setFBUnHold, setUser, setUserLoading } from "./authSlice";

const createUser = async (values) => {
  const docRef = doc(db, "users", values.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) return "User exist!";

  await setDoc(doc(db, "users", values.uid), {
    ...values,
    username: null,
    bio: null,
  });

  return "User inserted!";
};

export const getUser = createAsyncThunk("auth/getUser", async ({ uid }) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) return docSnap.data();

  return {};
});

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ user }, thunkAPI) => {
    await setDoc(doc(db, "users", user.uid), user, { merge: true });

    const { authSlice } = thunkAPI.getState();
    thunkAPI.dispatch(setUser({ ...authSlice.user, ...user }));

    return "User updated!";
  },
);

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
