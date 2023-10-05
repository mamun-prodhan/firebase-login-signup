import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [loginErrorCode, setLoginErrorCode] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");
  const emailRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoginError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoggedInUser(user);
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoginError(errorMessage);
        setLoginErrorCode(errorCode);
        console.log(errorCode, errorMessage);
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log("Provide an email");
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      console.log("Please write a valid email");
      return;
    }
    // send validation email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please check your email");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <div>
      <div className="w-1/2 mx-auto">
        <h2 className="text-3xl mb-8">Please Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="py-3 px-3 mb-4 w-3/4"
            ref={emailRef}
            type="email"
            name="email"
            id=""
            placeholder="Email Address"
          />
          <br />
          <input
            className="py-3 px-3 mb-4 w-3/4"
            type="password"
            name="password"
            id=""
            placeholder="Password"
          />
          <br />
          <label className="label" htmlFor="">
            <a
              onClick={handleForgetPassword}
              href="#"
              className="lable-text-alt link link-hover"
            >
              Forgot Password?
            </a>
          </label>
          {loginError && <p className="font-bold text-red-600">{loginError}</p>}
          {loggedInUser && (
            <p className="font-bold text-green-600">Successfully Logged In</p>
          )}
          <br />
          <input
            className="btn btn-secondary w-3/4 mb-4"
            type="submit"
            value="Login"
          />{" "}
          <br />
        </form>
        <p>
          New to this website? Please <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
