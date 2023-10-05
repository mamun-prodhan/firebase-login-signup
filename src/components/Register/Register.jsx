import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    console.log(email, password, terms);
    setRegisterError("");
    setRegisterSuccess("");

    if (password.length < 6) {
      setRegisterError("Password Must be 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError("Password Should Have at Least one Uppercase Character");
      return;
    } else if (!terms) {
      setRegisterError("Please accept our terms & conditions");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setRegisterSuccess("User Registered Successfully");
        // email verification
        sendEmailVerification(userCredential.user).then(() => {
          alert("A verification email is sent, Please verify your email");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setRegisterError(errorMessage);
      });
  };

  return (
    <div>
      <div className="w-1/2 mx-auto">
        <h2 className="text-3xl mb-8">Please Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="py-3 px-3 mb-4 w-3/4"
            type="email"
            name="email"
            id=""
            placeholder="Email Address"
            required
          />
          <br />
          <input
            className="relative py-3 px-3 mb-4 w-3/4"
            type={showPassword ? "text" : "password"}
            name="password"
            id=""
            placeholder="Password"
            required
          />
          <span
            className="cursor-pointer absolute  translate-x-[-200%] translate-y-[90%]"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          <br />
          <input className="mb-4" type="checkbox" name="terms" id="terms" />
          <label className="ms-4" htmlFor="terms">
            Accept Our <a href="">Terms and Conditions</a>
          </label>
          <br />
          {registerSuccess && (
            <p className="text-green-600 font-bold mb-3">{registerSuccess}</p>
          )}
          {registerError && (
            <p className="text-red-600 font-bold mb-3">{registerError}</p>
          )}
          <input
            className="btn btn-secondary w-3/4 mb-4"
            type="submit"
            value="REGISTER"
          />{" "}
          <br />
          <p>
            Already have an account? Please <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
