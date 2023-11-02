import {} from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../Firebase/Firebaseconfig";

const ProtectedRoute = ({ children }) => {
  // const user = JSON.parse(localStorage.getItem("user"));
  if (auth) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default ProtectedRoute;
