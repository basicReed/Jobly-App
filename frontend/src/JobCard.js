import axios from "axios";
import React, { useState, useContext } from "react";
import { Card, CardText, CardBody, CardTitle, Button } from "reactstrap";
import "./JobCard.css";
import { Link } from "react-router-dom";
import { AuthContext } from "./App";
import JoblyApi from "./Api";

function JobCard({ jobId, name, company, salary, equity }) {
  const { isAuthenticated, user } = useContext(AuthContext);

  const [applied, setApplied] = useState(user.applications.includes(jobId));

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleApply = async () => {
    try {
      const response = await JoblyApi.applyToJob(username, token, jobId);
      if (response.status === 200) {
        setApplied(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      className="my-2 jobCard"
      style={{
        backgroundColor: "white",
        width: "40rem",
        padding: "10px 25px",

        boxShadow: "0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)",
      }}
    >
      <CardBody>
        <div className="card-content">
          <CardTitle tag="h4">{name}</CardTitle>
          <CardText className="mid-text">{company}</CardText>

          <CardText className="sub-text">
            <small className="text-muted">{`Salary: ${salary}`}</small>
          </CardText>
          <CardText className="sub-text">
            <small className="text-muted">{`Equity: ${equity}`}</small>
          </CardText>
          {isAuthenticated ? (
            <button
              className={`btn btn-danger apply-button`}
              disabled={applied}
              onClick={handleApply}
            >
              {applied ? "APPLIED" : "APPLY"}
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary btn-block">
              Log In to Apply
            </Link>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

export default JobCard;
