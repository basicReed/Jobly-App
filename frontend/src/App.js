import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Jobly from "./Jobly";
import Companies from "./Companies";
import Jobs from "./Jobs";

export const AuthContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  async function logoutUser() {
    await setIsAuthenticated(false);
    console.log(`You Logged Out!`);
  }

  return (
    <>
      <AuthContext.Provider value={{ isAuthenticated, logoutUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact="true" element={<Navigate to="/login" />} />
            <Route
              path="/login"
              exact="true"
              element={
                isAuthenticated ? (
                  <Navigate to="/jobly" />
                ) : (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route
              path="/register"
              exact="true"
              element={
                isAuthenticated ? <Navigate to="/jobly" /> : <Register />
              }
            />
            <Route
              path="/jobly"
              exact="true"
              element={
                isAuthenticated ? (
                  <Jobly logoutUser={logoutUser} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/companies" exact="true" element={<Companies />} />
            <Route path="/jobs" exact="true" element={<Jobs />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
