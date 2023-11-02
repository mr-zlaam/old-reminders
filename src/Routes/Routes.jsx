import {} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "../Auth/AuthFormSignIn";
import TodoList from "../Components/TodoList";
import SignUp from "../Auth/AuthFormSignUp";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
const Routers = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/creatone" element={<SignUp />} />
          <Route
            path="/todo"
            element={
              <ProtectedRoute>
                <TodoList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routers;
