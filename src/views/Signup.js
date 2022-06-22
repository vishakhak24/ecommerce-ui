import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/icon.png";
import swal from "sweetalert";
import axios from "axios";

const Signup = ({ baseURL }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const signup = async (e) => {
    e.preventDefault();

    if (password === passwordConfirm) {
      const user = { email, firstName, lastName, password };
      console.log("user:", user);
      await axios
        .post(`${baseURL}user/signUp`, user)
        .then(() => {
          // redirect to home page
          navigate("/");
          swal({
            text: "User signup successful. Please Login",
            icon: "success",
            closeOnClickOutside: false,
          });
        })
        .catch((err) => console.log(err));
    } else {
      // passwords are not matching
      swal({
        text: "Password does not match",
        icon: "error",
        closeOnClickOutside: false,
      });
    }
  };
  return (
    <div className="container">
      {/* <!--    Link to Home--> */}
      <div className="row">
        <div className="col-12 text-center pt-3">
          <Link to="/">
            <img id="logo" src={logo} alt="logo" />
          </Link>
        </div>
      </div>
      {/* <!--   Sign up form--> */}
      <div className="row">
        <div className="col-12 justify-content-center d-flex flex-row pt-5">
          <div id="signup-div" className="flex-item border">
            <h2 className="pt-4 pl-4">Create Account</h2>
            <form onSubmit={signup} className="pt-4 pl-4 pr-4">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-row">
                <div className="col">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="name"
                      className="form-control"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="name"
                      className="form-control"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mt-2 py-0">
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
