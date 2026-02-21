import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditEmployee() {

const { id } = useParams();
const navigate = useNavigate();

const [employee, setEmployee] = useState({
firstName: "",
lastName: "",
email: "",
department: "",
salary: ""
});

useEffect(() => {
axios
.get(`http://localhost:8080/api/employees/${id}`)
.then(res => setEmployee(res.data));
}, [id]);

const handleChange = e => {
setEmployee({
...employee,
[e.target.name]: e.target.value
});
};

const handleSubmit = e => {
e.preventDefault();

axios
  .put(
    `http://localhost:8080/api/employees/${id}`,
    employee
  )
  .then(() => navigate("/"));

};

return (
<div style={{ padding: "20px" }}> <h2>Edit Employee</h2>

  <form onSubmit={handleSubmit}>

    <input
      name="firstName"
      placeholder="First Name"
      value={employee.firstName}
      onChange={handleChange}
    /><br /><br />

    <input
      name="lastName"
      placeholder="Last Name"
      value={employee.lastName}
      onChange={handleChange}
    /><br /><br />

    <input
      name="email"
      placeholder="Email"
      value={employee.email}
      onChange={handleChange}
    /><br /><br />

    <input
      name="department"
      placeholder="Department"
      value={employee.department}
      onChange={handleChange}
    /><br /><br />

    <input
      name="salary"
      placeholder="Salary"
      value={employee.salary}
      onChange={handleChange}
    /><br /><br />

    <button type="submit">Update</button>

  </form>
</div>

);
}

export default EditEmployee;
