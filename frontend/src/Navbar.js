import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./App";

function Navbar() {
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    logoutUser();
    navigate("/");
  };

  return (
    <nav>
      <h2 onClick={() => navigate("/jobly")}>Jobly</h2>
      <NavLink exact="true" to="/jobs" className="navbar-brand">
        Jobs
      </NavLink>
      <NavLink exact="true" to="/companies" className="navbar-brand">
        Companies
      </NavLink>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
