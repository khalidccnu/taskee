import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";

const Root = () => {
  const [isHBMenu, setHbMenu] = useState(true);
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" ? (
        <Header isHBMenu={isHBMenu} setHbMenu={setHbMenu} />
      ) : null}
      <Outlet context={{ isHBMenu, setHbMenu }} />
    </>
  );
};

export default Root;
