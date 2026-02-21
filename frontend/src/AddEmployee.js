import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./api/axiosConfig";

function AddEmployee() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ File validation
    if (profileImage) {
      const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedImageTypes.includes(profileImage.type)) {
        alert("Only JPG, JPEG, PNG allowed for Profile Image");
        return;
      }
    }

    if (resume) {
      if (resume.type !== "application/pdf") {
        alert("Only PDF allowed for Resume");
        return;
      }
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("department", department);
    formData.append("salary", salary);

    if (profileImage) formData.append("profileImage", profileImage);
    if (resume) formData.append("resume", resume);

    try {
      await axiosInstance.post("/employees", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Employee Added Successfully!");
      navigate("/employees");
    } catch (error) {
      console.error("Add Employee Error:", error);
      alert("Failed to add employee");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Add Employee
        </h2>

        <form onSubmit={handleSubmit}>

          {/* FIRST NAME */}
          <label style={labelStyle}>First Name</label>
          <input
            type="text"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={inputStyle}
            required
          />

          {/* LAST NAME */}
          <label style={labelStyle}>Last Name</label>
          <input
            type="text"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={inputStyle}
            required
          />

          {/* EMAIL */}
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />

          {/* DEPARTMENT */}
          <label style={labelStyle}>Department</label>
          <input
            type="text"
            placeholder="Enter Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            style={inputStyle}
            required
          />

          {/* SALARY */}
          <label style={labelStyle}>Salary</label>
          <input
            type="number"
            placeholder="Enter Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            style={inputStyle}
            required
          />

          {/* PROFILE IMAGE */}
          <label style={labelStyle}>Profile Image (JPG, PNG)</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => setProfileImage(e.target.files[0])}
            style={inputStyle}
          />

          {/* RESUME */}
          <label style={labelStyle}>Resume (PDF only)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files[0])}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Add Employee
          </button>

        </form>
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "40px",
};

const cardStyle = {
  background: "#fff",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  width: "500px",
};

const labelStyle = {
  fontWeight: "600",
  marginTop: "10px",
  display: "block",
  marginBottom: "5px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  marginBottom: "12px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px",
};

export default AddEmployee;
