import axios from "axios";
import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import Navbar from "./Navbar";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let jobsList = await axios.get("http://localhost:3001/jobs");
      setJobs(jobsList.data.jobs);
    }
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <h1>Jobs</h1>

      {jobs.length &&
        jobs.map((job) => (
          <JobCard
            key={job.id}
            name={job.title}
            company={job.companyName}
            salary={job.salary}
            equity={job.equity}
          />
        ))}
    </>
  );
}

export default Jobs;
