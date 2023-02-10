import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobCard from "./JobCard";
import "./Company.css";
import JoblyApi from "./Api";

function Company() {
  const { handle } = useParams();
  const [company, setCompany] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const companyData = await JoblyApi.getCompany(handle);
        setCompany(companyData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="companies-wrapper">
      <div className="company-name">
        <h1>{company.name}</h1>
        <p>{company.description}</p>
      </div>

      {isLoading ? (
        <h5>Loading...</h5>
      ) : (
        company.jobs &&
        company.jobs.map((job) => (
          <JobCard
            key={job.id}
            jobId={job.id}
            name={job.title}
            salary={job.salary}
            equity={job.equity}
          />
        ))
      )}
    </div>
  );
}

export default Company;
