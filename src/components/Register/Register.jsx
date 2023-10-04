const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
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
