/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";

import "./AuthForm.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/Firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputFieldError, setInputFieldError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");
  const navigate = useNavigate();

  const SignIn = async () => {
    try {
      if ((email.length, password.length) === 0)
        return setInputFieldError("! Please fill the required fields");
      const user = await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setSignUpMessage(`✔ Signed in Successfully`);
      localStorage.setItem("user", JSON.stringify(user));
      setTimeout(() => {
        navigate("/todo");
      }, 1500);
    } catch (error) {
      console.log(error);
      setLoginError("!  You have Slow internet or Password or Email is wrong ");
    }
  };
  const emailOnchange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
    setInputFieldError("");
  };
  const passwordOnchange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
    setInputFieldError("");
  };
  return (
    <>
      <div className="maines">
        <div className="form">
          <h1 className="text-center font-bold text-3xl p-4 text-white relative top-20">
            Sign In
          </h1>
          <div className="button_and_inputs">
            <div className=" flex flex-col justify-center items-center gap-4 h-[20vh] mt-20">
              <input
                onChange={(event) => {
                  emailOnchange(event);
                }}
                type="email"
                className=" email_pass"
                placeholder="Enter Email "
                autoComplete="off"
                autoFocus
              />
              <input
                value={password}
                onChange={(event) => {
                  passwordOnchange(event);
                }}
                type="password"
                className=" email_pass"
                placeholder="Enter Password "
              />
            </div>
            <button className="buttons rounded-md " onClick={SignIn}>
              Sign in
            </button>

            <p className="text-[14px] text-white flex gap-2 mt-4 didAccount">
              Didn't have an account?
              <Link
                to="/creatone"
                className="text-blue-300  cursor-pointer hover:opacity-75 transition-all duration-300"
              >
                Create a new Account
              </Link>
            </p>
            <p className="text-sm text-yellow-500 m-4 didAccount">
              {inputFieldError}
            </p>
            <p className="text-xl text-green-300 m-4 didAccounterror">
              {signUpMessage}
            </p>
            <p className="text-sm text-yellow-500 m-4 didAccounterror">
              {loginError}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
