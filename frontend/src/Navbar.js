import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./App";
import { Navbar, NavItem, Nav } from "reactstrap";
import "./NavBar.css";

function NavBar({ user }) {
  const { removeUser } = useContext(AuthContext);

  const handleLogout = () => {
    removeUser();
  };

  return (
    <div>
      <Navbar
        fixed="top"
        expand="navbar-expand"
        className="justify-content-between"
      >
        <NavLink exact="true" to="/jobly" className="navbar-brand">
          Jobly
        </NavLink>

        <Nav className="ms-auto" navbar-nav>
          <NavItem className="me-4">
            <NavLink exact="true" to="/companies">
              Companies
            </NavLink>
          </NavItem>
          <NavItem className="me-4">
            <NavLink exact="true" to="/jobs">
              Jobs
            </NavLink>
          </NavItem>
          <NavItem className="me-4">
            <NavLink exact="true" to="/profile">
              Profile
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink exact="true" onClick={handleLogout} to="/login">
              {`Logout ${localStorage.getItem("username")}`}
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
