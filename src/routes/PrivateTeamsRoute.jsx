import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTeams } from "../utils/localStorage.js";

const PrivateTeamsRoute = ({ children }) => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [isExist, setExist] = useState(false);
  const { user } = useSelector((store) => store.authSlice);

  useEffect(() => {
    if (user) {
      const indexTeams = getTeams().findIndex(
        (team) => team.users.includes(user.uid) && team.id === id,
      );

      indexTeams !== -1 ? setExist(true) : null;
      setLoading(false);
    }
  }, [user]);

  return !isLoading ? (
    isExist ? (
      children
    ) : (
      <Navigate to="/dashboard" replace={true}></Navigate>
    )
  ) : null;
};

export default PrivateTeamsRoute;
