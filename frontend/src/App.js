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
import useLocalStorage from "./useLocalStorage";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();
export const TOKEN_STORAGE_ID = "token";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  // const [appliedJobs, setAppliedJobs] = useState([]);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  /**
   * Checks if token is present & setsIsAthenticated
   */
  useEffect(() => {
    async function fetchData() {
      if (token) {
        try {
          let decodedToken = jwt_decode(token);
          let userData = await JoblyApi.getUser(decodedToken.username);
          setUser(userData);
        } catch (error) {
          console.log(error);
          setUser(null);
        }
      }
      setIsLoading(false);
    }
    setIsLoading(true);
    fetchData();
  }, [token]);

  /**
   *  Stores user data in local storage and sets authentication
   */
  async function storeUser(newToken, username) {
    //store token in LS
    localStorage.setItem("token", newToken);
    localStorage.setItem("username", username);
    setIsAuthenticated(true);
    setToken(newToken);
  }

  /**
   * Remove user data from local storage and authentication
   */
  async function removeUser() {
    localStorage.clear();
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    // setIsLoading(true);
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="App-background">
      <AuthContext.Provider
        value={{
          isAuthenticated,
          setIsAuthenticated,
          removeUser,
          user,
        }}
      >
        <BrowserRouter>
          {/* {isLoading ? <Loading /> : null} */}
          {user ? <NavBar /> : null}
          <Routes>
            {/* Check login & route | redirect if no route */}
            <Route
              path="/*"
              element={
                isAuthenticated ? (
                  <Navigate to="/jobly" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            {/* <Route path="/" exact="true" element={<Navigate to="/login" />} /> */}
            <Route
              path="/login"
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
              element={
                isAuthenticated ? (
                  <Navigate to="/jobly" />
                ) : (
                  <Register storeUser={storeUser} />
                )
              }
            />

            <Route path="/" element={<NavBar />} />
            <Route path="/jobly" element={<Jobly user={user} />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/profile" element={<UserProfile user={user} />} />
            <Route path="/companies/:handle" element={<Company />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
