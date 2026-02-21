import { useEffect, useState } from "react";
import axiosInstance from "./api/axiosConfig";

function Employees() {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axiosInstance.get("/employees")
      .then(res => {
        setEmployees(res.data);
      })
      .catch(err => console.error("Axios Error:", err));
  }, []);

  const downloadResume = async (id, fileName) => {
    try {
      const response = await axiosInstance.get(
        `/employees/${id}/resume`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Download failed", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Employees List</h2>

      <table className="table table-bordered table-striped text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Profile Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Resume</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>

              {/* 🔥 PROFILE IMAGE */}
<td>
  {emp.profileImageName ? (
    <img
      src={`http://localhost:8080/uploads/images/${emp.profileImageName}`}
      alt="Profile"
      width="60"
      height="60"
      style={{ borderRadius: "50%", objectFit: "cover" }}
    />
  ) : (
    "No Image"
  )}
</td>

              <td>{emp.firstName} {emp.lastName}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{emp.salary}</td>

              <td>
                {emp.resumeName ? (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => downloadResume(emp.id, emp.resumeName)}
                  >
                    Download
                  </button>
                ) : (
                  "No Resume"
                )}
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;
