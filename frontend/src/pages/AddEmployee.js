import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddEmployee() {

const navigate = useNavigate();

const [form, setForm] = useState({
firstName: "",
lastName: "",
email: "",
department: "",
salary: ""
});

const [profileImage, setProfileImage] = useState(null);
const [resume, setResume] = useState(null);

const handleChange = e => {
setForm({
...form,
[e.target.name]: e.target.value
});
};

const handleSubmit = e => {
e.preventDefault();

const data = new FormData();

Object.keys(form).forEach(key =>
  data.append(key, form[key])
);

data.append("profileImage", profileImage);
data.append("resume", resume);

axios
  .post(
    "http://localhost:8080/api/employees/upload",
    data
  )
  .then(() => navigate("/"));

};

return (
<div style={{ padding: "20px" }}> <h2>Add Employee</h2>

  <form onSubmit={handleSubmit}>

    <input name="firstName" placeholder="First Name" onChange={handleChange} /><br /><br />
    <input name="lastName" placeholder="Last Name" onChange={handleChange} /><br /><br />
    <input name="email" placeholder="Email" onChange={handleChange} /><br /><br />
    <input name="department" placeholder="Department" onChange={handleChange} /><br /><br />
    <input name="salary" placeholder="Salary" onChange={handleChange} /><br /><br />

    <input type="file" onChange={e => setProfileImage(e.target.files[0])} /><br /><br />
    <input type="file" onChange={e => setResume(e.target.files[0])} /><br /><br />

    <button type="submit">Save</button>

  </form>
</div>

);
}

export default AddEmployee;
