import React, { useEffect, useState } from "react";
import axios from "axios";

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    semester: "",
    section: "",
    year: "",
    month: ""
  });

  const fetchInternships = async () => {
    try {
      const query = Object.entries(filters)
        .filter(([_, value]) => value !== "")
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      const res = await axios.get(`http://localhost:6001/api/admin/internships/filter?${query}`);
      setInternships(res.data);
    } catch (error) {
      console.error("Error fetching internships:", error);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = () => {
    fetchInternships();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Internships</h2>

      <div className="row g-3 mb-4">
        <div className="col-md-2">
          <select className="form-select" name="type" onChange={handleChange} value={filters.type}>
            <option value="">All Status</option>
            <option value="ongoing">Ongoing</option>
            <option value="past">Past</option>
            <option value="future">Upcoming</option>
          </select>
        </div>

        <div className="col-md-2">
          <select className="form-select" name="semester" onChange={handleChange} value={filters.semester}>
            <option value="">All Semesters</option>
            <option value="2-1">2-1</option>
            <option value="2-2">2-2</option>
            <option value="3-1">3-1</option>
            <option value="3-2">3-2</option>
            <option value="4-1">4-1</option>
            <option value="4-2">4-2</option>
          </select>
        </div>

        <div className="col-md-2">
          <select className="form-select" name="section" onChange={handleChange} value={filters.section}>
            <option value="">All Sections</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>

        <div className="col-md-2">
          <select className="form-select" name="year" onChange={handleChange} value={filters.year}>
            <option value="">All Years</option>
            {[2023, 2024, 2025, 2026].map(yr => (
              <option key={yr} value={yr}>{yr}</option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <select className="form-select" name="month" onChange={handleChange} value={filters.month}>
            <option value="">All Months</option>
            {[
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
            ].map((m, i) => (
              <option key={i + 1} value={i + 1}>{m}</option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={handleFilter}>Apply Filter</button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Roll No</th>
              <th>Organization</th>
              <th>Role</th>
              <th>Start Date</th>
              <th>End Date</th>
              
              <th>Semester</th>
              <th>Section</th>
              <th>Package</th>
            </tr>
          </thead>
          <tbody>
            {internships.map((i) => (
              <tr key={i._id}>
                <td>{i.rollNo}</td>
                <td>{i.organization}</td>
                <td>{i.role}</td>
                <td>{new Date(i.startDate).toLocaleDateString()}</td>
                <td>{new Date(i.endDate).toLocaleDateString()}</td>
               
                <td>{i.semester || "-"}</td>
                <td>{i.section || "-"}</td>
                <td>{i.pay || "-"}</td>
              </tr>
            ))}
            {internships.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center text-muted">No internships found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Internships;