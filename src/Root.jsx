import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";

const Root = () => {
  const [isHBMenu, setHbMenu] = useState(true);
  const [isNIMOpen, setNIMOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" ? (
        <Header
          isHBMenu={isHBMenu}
          setHbMenu={setHbMenu}
          setNIMOpen={setNIMOpen}
        />
      ) : null}
      <Outlet context={{ isHBMenu, setHbMenu, isNIMOpen, setNIMOpen }} />
    </>
  );
};

export default Root;
