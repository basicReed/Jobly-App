import axios from "axios";

const BASE_API_URL = "http://localhost:3001";

/* 
  json-server will give you CRUD endpoints on snacks and drinks.
  Here we've provided you with a single action to get all drinks.

  You'll need to add to this class as you build features for the app.
*/

class JoblyApi {
  static async login(username, password) {
    let { data } = await axios.post(`${BASE_API_URL}/auth/token`, {
      username,
      password,
    });
    return data.token;
  }

  static async register(username, password, firstName, lastName, email) {
    let { data } = await axios.post(`${BASE_API_URL}/auth/register`, {
      username,
      password,
      firstName,
      lastName,
      email,
    });
    return data.token;
  }

  static async getUser(username) {
    let token = localStorage.getItem("token");
    let { data } = await axios.get(`${BASE_API_URL}/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.user;
  }

  static async getAllCompanies() {
    let { data } = await axios.get(`${BASE_API_URL}/companies`);
    return data.companies;
  }

  static async searchCompanies(searchTerm) {
    const { data } = await axios.get(`${BASE_API_URL}/companies/`, {
      params: {
        name: searchTerm,
      },
    });
    return data.companies;
  }

  static async getAllJobs() {
    const { data } = await axios.get(`${BASE_API_URL}/jobs`);
    return data.jobs;
  }

  static async applyToJob(username, token, jobId) {
    const resp = await axios.post(
      `http://localhost:3001/users/${username}/jobs/${jobId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return resp;
  }

  static async searchJobs(searchTerm) {
    const { data } = await axios.get(`${BASE_API_URL}/jobs/`, {
      params: {
        title: searchTerm,
      },
    });
    return data.jobs;
  }
}

export default JoblyApi;
