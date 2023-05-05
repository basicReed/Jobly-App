import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import JoblyApi from "./Api";

function Login({ storeUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let token = await JoblyApi.login(username, password);
      storeUser(token, username);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile-form">
      <h1>Login</h1>
      <div className=" card card-form">
        <div className="card-body">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>
                Username:
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  autoComplete="current-username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                Password:
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Label>
            </FormGroup>
            <Button type="submit">Log In</Button>
            <a
              className="login-register-link"
              onClick={() => navigate("/register")}
            >
              {" "}
              Register
            </a>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
