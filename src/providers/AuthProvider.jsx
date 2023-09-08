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
          const { payload } = await dispatch(getUser(userCred.uid));

          dispatch(
            setUser({
              ...userCred,
              displayName: payload.displayName,
              username: payload.username,
              bio: payload.bio,
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
