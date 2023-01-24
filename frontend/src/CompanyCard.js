import React from "react";

function CompanyCard({ name, bio }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{bio}</p>
    </div>
  );
}
export default CompanyCard;
