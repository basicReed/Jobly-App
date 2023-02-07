import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Jobly from "./Jobly";
import Companies from "./Companies";
import Jobs from "./Jobs";
import Company from "./Company";
import UserProfile from "./UserProfile";
import NavBar from "./NavBar";
import Loading from "./Loading";
import JoblyApi from "./Api";
import "./App.css";
export const AuthContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [appliedJobs, setAppliedJobs] = useState([]);

  // const updateAppliedJobs = (id) => {
  //   setAppliedJobs({ ...appliedJobs, id });
  // };

  /**
   * Checks if token is present & setsIsAthenticated
   */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token) {
      setIsAuthenticated(true);
      // get and set user data for each page if authenticated
      async function fetchData() {
        try {
          let userData = await JoblyApi.getUser(username);
          setUser(userData);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  /**
   *  Stores user data in local storage and sets authentication
   */
  async function storeUser(token, username) {
    //store token in LS
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    await setIsAuthenticated(true);
  }

  /**
   * Remove user data from local storage and authentication
   */
  async function removeUser() {
    localStorage.clear();
    await setIsAuthenticated(false);
  }

  return (
    <div className="App-background">
      <AuthContext.Provider
        value={{
          isAuthenticated,
          removeUser,
          user,
        }}
      >
        <BrowserRouter>
          {/* {isLoading ? <Loading /> : null} */}
          {isAuthenticated ? <NavBar /> : null}
          <Routes>
            <Route path="/" exact="true" element={<Navigate to="/login" />} />
            <Route
              path="/login"
              exact="true"
              element={
                isAuthenticated ? (
                  <Navigate to="/jobly" />
                ) : (
                  <Login storeUser={storeUser} />
                )
              }
            />
            <Route
              path="/register"
              exact="true"
              element={
                isAuthenticated ? (
                  <Navigate to="/jobly" />
                ) : (
                  <Register storeUser={storeUser} />
                )
              }
            />

            <Route
              path="/"
              exact="true"
              element={isAuthenticated ? <NavBar /> : <Navigate to="/login" />}
            />
            <Route
              path="/jobly"
              exact="true"
              element={
                isAuthenticated ? (
                  <Jobly user={user} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/companies"
              exact="true"
              element={
                isAuthenticated ? <Companies /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/jobs"
              exact="true"
              element={isAuthenticated ? <Jobs /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              exact="true"
              element={
                isAuthenticated ? (
                  <UserProfile user={user} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/companies/:handle"
              element={isAuthenticated ? <Company /> : <Navigate to="/login" />}
            />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
