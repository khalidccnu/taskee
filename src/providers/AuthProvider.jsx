import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase.config.js";
import {
  setFBUnHold,
  setUser,
  setUserLoading,
} from "../redux/auth/authSlice.js";

const AuthProvider = () => {
  const { isFBUnHold } = useSelector((store) => store.authSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFBUnHold) {
      const authChange = onAuthStateChanged(auth, (userCred) => {
        if (userCred) {
          dispatch(setUser(userCred));
          sessionStorage.setItem("_vu", JSON.stringify(true));
        } else {
          dispatch(setFBUnHold(false));
          dispatch(setUser(null));
        }

        dispatch(setUserLoading(false));
      });

      return () => authChange();
    }
  }, [isFBUnHold]);

  return <></>;
};

export default AuthProvider;
