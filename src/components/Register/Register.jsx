import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setRegisterError("");
    setRegisterSuccess("");

    if (password.length < 6) {
      setRegisterError("Password Must be 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError("Password Should Have at Least one Uppercase Character");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setRegisterSuccess("User Registered Successfully");
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
          {registerSuccess && (
            <p className="text-green-600 font-bold mb-3">{registerSuccess}</p>
          )}
          {registerError && (
            <p className="text-red-600 font-bold mb-3">{registerError}</p>
          )}
          <input
            className="btn btn-secondary w-3/4"
            type="submit"
            value="REGISTER"
          />{" "}
          <br />
        </form>
      </div>
    </div>
  );
};

export default Register;
