import "regenerator-runtime/runtime";

import React from "react";
import { IKContext } from "imagekitio-react";

const IkProvider = ({ children }) => {
  return (
    <IKContext
      urlEndpoint={`https://ik.imagekit.io/${import.meta.env.VITE_IK_ID}`}
    >
      {children}
    </IKContext>
  );
};

export default IkProvider;
