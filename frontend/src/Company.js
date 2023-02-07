import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobCard from "./JobCard";
import "./Company.css";

function Company() {
  const { handle } = useParams();
  const [company, setCompany] = useState({});

  useEffect(() => {
    async function fetchData() {
      const companyData = await axios.get(
        `http://localhost:3001/companies/${handle}`
      );
      setCompany(companyData.data.company);
    }
    fetchData();
  }, []);

  return (
    <div className="companies-wrapper">
      <div className="company-name">
        <h1>{company.name}</h1>
        <p>{company.description}</p>
      </div>

      {company.jobs &&
        company.jobs.map((job) => (
          <JobCard
            key={job.id}
            jobId={job.id}
            name={job.title}
            salary={job.salary}
            equity={job.equity}
          />
        ))}
    </div>
  );
}

export default Company;
