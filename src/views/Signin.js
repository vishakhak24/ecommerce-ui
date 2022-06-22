import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/icon.png";
import axios from "axios";
import swal from "sweetalert";

const Signin = ({ baseURL }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signin = async (e) => {
    e.preventDefault();

    // set loading to true
    setLoading(true);
    await axios
      .post(`${baseURL}user/signIn`, { email, password })
      .then((res) => {
        // login successful, we will get token in res.data object
        localStorage.setItem("token", res.data.token);

        navigate("/");
        swal({
          text: "Login successful. Please continue",
          icon: "success",
        });
      })
      .catch((err) => {
        swal({
          text: "Unable to Log you in!",
          icon: "error",
          closeOnClickOutside: false,
        });
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      {/* <!--    Logo Div--> */}
      <div className="row">
        <div className="col-12 text-center pt-3">
          <Link to="/">
            <img id="logo" src={logo} alt="logo" />
          </Link>
        </div>
      </div>
      {/* <!--    sign in form--> */}
      <div className="row">
        <div className="col-12 justify-content-center d-flex flex-row pt-5">
          <div id="signin-div" className="flex-item border">
            <h2 className="pt-4 pl-4">Sign-In</h2>
            <form onSubmit={signin} className="pt-4 pl-4 pr-4">
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
              <small className="form-text text-muted">
                By continuing, you agree to Simplecoding's Conditions of Use and
                Privacy Notice.
              </small>
              <button type="submit" className="btn btn-primary mt-2 py-0">
                Continue
                {/* <!--  loading bar will appear when we are making the API call and saveing the token --> */}
                {loading && (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </button>
            </form>

            <hr />
            <small className="form-text text-muted pt-2 pl-4 text-center">
              New to Simplecoding?
            </small>
            <p className="text-center">
              {/* <router-link :to="{name: 'Signup'}" className="btn btn-dark text-center mx-auto px-5 py-1 mb-2">Create Your Simplecoding Account</router-link> */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
