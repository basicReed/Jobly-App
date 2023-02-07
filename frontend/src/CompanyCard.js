import React from "react";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";
import "./CompanyCard.css";
import { Link } from "react-router-dom";

function CompanyCard({ name, bio, handle }) {
  return (
    <Link to={`/companies/${handle}`}>
      <Card
        className="my-2 cardhover companyCard"
        style={{
          backgroundColor: "white",
          width: "40rem",
          padding: "10px 25px",
          margin: "10px auto",
          boxShadow: "0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)",
        }}
      >
        <CardBody>
          <CardTitle tag="h3">{name}</CardTitle>
          <CardText>{bio}</CardText>
        </CardBody>
      </Card>
    </Link>
  );
}
export default CompanyCard;
