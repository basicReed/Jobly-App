import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./UserProfile.css";
import JoblyApi from "./Api";

function UserProfile({ user }) {
  const [formData, setFormData] = useState({
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await JoblyApi.updateUser(user.username, formData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile-form">
      <h1>Profile</h1>
      <div className=" card card-form">
        <div className="card-body">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>
                Username:
                <Input
                  type="text"
                  name="username"
                  value={user.username}
                  disabled
                />
              </Label>
            </FormGroup>

            <FormGroup>
              <Label>
                First Name:
                <Input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </Label>
            </FormGroup>

            <FormGroup>
              <Label>
                Last Name:
                <Input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </Label>
            </FormGroup>

            <FormGroup>
              <Label>
                Email:
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Label>
            </FormGroup>

            <Button type="submit">Update</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
