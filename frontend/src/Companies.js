import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import { Form, Row, Input, Button } from "reactstrap";
import JoblyApi from "./Api";

import "./Companies.css";

function Companies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    console.log("search: ", searchTerm);
    try {
      const companies = await JoblyApi.searchCompanies(searchTerm);
      setCompanies(companies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      let companiesList = await JoblyApi.getAllCompanies();
      setCompanies(companiesList);
    }
    fetchData();
  }, []);

  return (
    <div className="companies-wrapper">
      <Form className="SearchForm mb-4" onSubmit={handleSearch}>
        <Row className="row justify-content-center justify-content-lg-start gx-0">
          <div className="col-8">
            <Input
              type="text"
              placeholder="Search for a company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-auto">
            <Button type="submit">Search</Button>
          </div>
        </Row>
      </Form>
      <div className="companiesList">
        {companies.length > 0 ? (
          companies.map((company) => (
            <CompanyCard
              key={company.handle}
              name={company.name}
              bio={company.description}
              handle={company.handle}
            />
          ))
        ) : (
          <h5>No results found...</h5>
        )}
      </div>
    </div>
  );
}

export default Companies;
