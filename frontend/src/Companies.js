import axios from "axios";
import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import Navbar from "./Navbar";

function Companies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let companiesList = await axios.get("http://localhost:3001/companies");
      setCompanies(() => companiesList.data.companies);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Companies</h1>

      {companies.length &&
        companies.map((company) => (
          <CompanyCard
            key={company.handle}
            name={company.name}
            bio={company.description}
          />
        ))}
    </div>
  );
}

export default Companies;
