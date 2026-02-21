import API from "./axiosConfig";

export const getEmployees = () => {
  return API.get("/employees");
};

export const addEmployee = (data) => {
  return API.post("/employees/create-with-files", data);
};
