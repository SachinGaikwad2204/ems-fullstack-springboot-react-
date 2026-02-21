import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/api/employees");
      console.log(response.data); // for debugging
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetchEmployees();
  }, [navigate]);

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={handleLogout}
        style={{
          marginBottom: "20px",
          padding: "8px 12px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      <h2>Employees List</h2>

      {employees.length === 0 ? (
        <p>No Employees Found</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Resume</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.firstName} {emp.lastName}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.salary}</td>

<td>
  {emp.resumeName ? (
    <a
      href={`http://localhost:8080/uploads/resumes/${emp.resumeName}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      View Resume
    </a>
  ) : (
    "No Resume"
  )}
</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Employees;
