import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase.config.js";
import {
  setFBUnHold,
  setUser,
  setUserLoading,
} from "../redux/auth/authSlice.js";
import { getUser } from "../redux/auth/authThunks.js";

const AuthProvider = () => {
  const { isFBUnHold } = useSelector((store) => store.authSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFBUnHold) {
      const authChange = onAuthStateChanged(auth, async (userCred) => {
        if (userCred) {
          const { uid, displayName, email, photoURL } = userCred;

          const { payload: userFromFS } = await dispatch(getUser({ uid }));
          dispatch(
            setUser({
              uid,
              displayName,
              email,
              photoURL,
              ...userFromFS,
            }),
          );
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
