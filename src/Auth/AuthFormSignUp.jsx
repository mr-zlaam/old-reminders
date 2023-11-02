import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase/Firebaseconfig";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");
  const [inputFieldError, setInputFieldError] = useState("");
  const CreateUser = async () => {
    try {
      if (email.length === 0 || password.length === 0) {
        setInputFieldError("! Please fill the required fields");
        return;
      }

      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userUID = user.uid;

      // Store the user data in Firestore
      const userRef = doc(db, "users", userUID);
      await setDoc(userRef, {
        email: email,
        // You can add other user data here if needed
      });

      setSignUpMessage(`✔ Signed up Successfully`);
      setEmail("");
      setPassword("");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.log(error);
      setLoginError(
        "! Maybe this email is already used or You have slow internet"
      );
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
    <div className="maines">
      <div className="form">
        <h1 className="text-center font-bold text-3xl p-4 text-white relative top-20">
          Create an Account
        </h1>
        <div className="button_and_inputs">
          <div className=" flex flex-col justify-center items-center gap-4 h-[20vh] mt-20">
            <input
              value={email}
              onChange={(event) => {
                emailOnchange(event);
              }}
              type="email"
              className=" email_pass"
              placeholder="Enter Email "
            />
            <input
              value={password}
              onChange={(event) => {
                passwordOnchange(event);
              }}
              type="password"
              className=" email_pass"
              placeholder="Create Password "
            />
          </div>
          <button onClick={CreateUser} className="buttons rounded-md ">
            Create Account
          </button>

          <p className="text-[14px] text-white flex gap-2 mt-4">
            Already have an account?
            <Link
              to={"/"}
              className="text-blue-300  cursor-pointer hover:opacity-75 transition-all duration-300"
            >
              Sign in
            </Link>
          </p>
          <p className=" inputError text-sm text-yellow-500 m-4">
            {inputFieldError}
          </p>
          <p className="text-xl text-green-300 m-4">{signUpMessage}</p>
          <p className="text-sm text-yellow-500 m-4">{loginError}</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
