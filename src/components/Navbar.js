import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/icon.png";
import swal from "sweetalert";

const Navbar = () => {
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    swal({
      text: "Log out successfully",
      icon: "success",
      closeOnClickOutside: false,
    });
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        <img src={logo} id="logo" alt="logo" />
      </Link>

      {/* <!--    Burger Button--> */}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {/* <!--      Search Bar--> */}
        <form className="form-inline ml-auto mr-auto">
          <div className="input-group">
            <input
              size="100"
              type="text"
              className="form-control"
              placeholder="Search Items"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            <div className="input-group-prepend">
              <span className="input-group-text" id="search-button-navbar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </span>
            </div>
          </div>
        </form>

        {/* <!--      DropDowns--> */}
        <ul className="navbar-nav ml-auto">
          {/* <!--      Admin drop down--> */}
          <li className="nav-item dropdown">
            <a
              className="nav-link text-light dropdown-toggle"
              href="#"
              id="navbarDropdownAdmin"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Admin
            </a>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownAdmin"
            >
              <Link to="/admin/category" className="dropdown-item">
                Category
              </Link>
              <Link to="/admin/product" className="dropdown-item">
                Products
              </Link>
            </div>
          </li>

          {/* <!--      Account drop down--> */}
          <li className="nav-item dropdown">
            <a
              className="nav-link text-light dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Accounts
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              {/* <!--              implement three dropdown items-->
            <!--              1. Log In (if user is not logged in )-->
            <!--              2. Sign Up (if user is not logged in )-->
            <!--              3. Log out (only show if user is logged in)--> */}
              {localStorage.getItem("token") ? (
                <>
                  <Link to="/wishlist" className="dropdown-item">
                    WishList
                  </Link>
                  <a className="dropdown-item" href="#" onClick={signOut}>
                    Sign Out
                  </a>
                </>
              ) : (
                <>
                  <Link to="/signin" className="dropdown-item">
                    WishList
                  </Link>
                  <Link to="/signin" className="dropdown-item">
                    Log In
                  </Link>
                  <Link to="/signup" className="dropdown-item">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </li>
          <li className="nav-item">
            <Link className="text-light" to="/cart">
              <i
                className="fa fa-shopping-cart"
                style={{ fontSize: "36px" }}
              ></i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
