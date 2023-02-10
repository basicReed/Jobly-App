import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import { Form, Row, Input, Button } from "reactstrap";
import JoblyApi from "./Api";
import "./Jobs.css";

function Jobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const jobsList = await JoblyApi.searchJobs(searchTerm);
      setJobs(jobsList);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      try {
        let jobsList = await JoblyApi.getAllJobs();
        setJobs(jobsList);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="jobs-wrapper">
      <Form className="SearchForm mb-4" onSubmit={handleSearch}>
        <Row className="row justify-content-center justify-content-lg-start gx-0">
          <div className="col-8">
            <Input
              type="text"
              placeholder="Search for a job title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-auto">
            <Button type="submit">Search</Button>
          </div>
        </Row>
      </Form>

      <div className="jobsList">
        {isLoading ? (
          <h5>Loading...</h5>
        ) : jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard
              key={job.id}
              jobId={job.id}
              name={job.title}
              company={job.companyName}
              salary={job.salary}
              equity={job.equity}
            />
          ))
        ) : (
          <h5>No results found...</h5>
        )}
      </div>
    </div>
  );
}

export default Jobs;
