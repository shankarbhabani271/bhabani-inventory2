import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function EmployeeDetails() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    department: "",
    employeeRef: "",
    password:"",
    role: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const saveEmployeeDetails = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:8080/api/employee/details",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert(res.data.message);

    //Redirect to login page after success
    navigate("/login");

  } catch (error) {
    console.log(error.response.data);

    alert(
      error.response?.data?.message ||
      "Something went wrong"
    );
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl grid md:grid-cols-2 overflow-hidden">
        
        {/* Left Section */}
        <div className="bg-indigo-700 text-white flex flex-col justify-center p-10">
          
          <Link to="/">
  <h1 className="text-4xl font-bold mb-4">
    Employee Registration
  </h1>
</Link>
          <p className="text-lg text-gray-200">
            Fill employee details and assign roles.
          </p>
        </div>

        {/* Right Section */}
        <div className="p-10">
          <h2 className="text-3xl font-bold text-center mb-6">
            Employee Form
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-lg"
          />

          <input
            type="text"
            name="mobile"
            placeholder="Enter Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-lg"
          />

          <input
            type="text"
            name="department"
            placeholder="Enter Department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-lg"
          />

          <input
            type="text"
            name="employeeRef"
            placeholder="Enter Employee Ref ID"
            value={formData.employeeRef}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-lg"
          />
          <input
            type="text"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-lg"
          />

          {/* Role Dropdown */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 mb-6 border rounded-lg"
          >
            <option value="">Select Role</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Ticket">Ticket</option>
          </select>

          <button
            onClick={saveEmployeeDetails}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
          >
            Save Employee Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;