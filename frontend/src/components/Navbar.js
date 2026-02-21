import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <span className="navbar-brand">EMS Portal</span>

      <div className="ms-auto">
        <Link className="btn btn-outline-light me-2" to="/employees">
          Employees
        </Link>
        <Link className="btn btn-outline-success me-2" to="/add">
          Add Employee
        </Link>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
