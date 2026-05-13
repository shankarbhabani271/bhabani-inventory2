import React, { useState } from "react";
import axios from "axios";
import {
  User,
  Phone,
  Mail,
  Building2
} from "lucide-react";

const CreateEmployee = () => {
  // Auto generate employee ID
  const generateEmployeeId = () => {
    const lastEmployeeNumber =
      Number(localStorage.getItem("employeeSerial")) || 0;

    const newEmployeeNumber = lastEmployeeNumber + 1;

    localStorage.setItem(
      "employeeSerial",
      String(newEmployeeNumber)
    );

    return `EMP${String(newEmployeeNumber).padStart(4, "0")}`;
  };

  const [formData, setFormData] = useState({
    employeeId: generateEmployeeId(),
    name: "",
    mobile: "",
    email: "",
    department: "",
    blood: "",
    role: ""
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const {
      name,
      mobile,
      email,
      department,
      blood,
      role
    } = formData;

    if (
      !name ||
      !mobile ||
      !email ||
      !department ||
      !blood ||
      !role
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://192.168.1.10:8080/api/invite/send-link",
        formData
      );

      alert(res.data.message);

      setFormData({
        employeeId: generateEmployeeId(),
        name: "",
        mobile: "",
        email: "",
        department: "",
        blood: "",
        role: ""
      });

    } catch (error: any) {
      console.log(error);
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-yellow-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-3xl p-8">
        <form onSubmit={handleSubmit}>
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Employee Registration
            </h1>
            <p className="text-gray-500">
              Inventory Management System
            </p>
          </div>

          {/* Form Grid */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Name */}
            <div>
              <label className="block mb-2 font-medium">
                Employee Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={18}/>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter employee name"
                  className="w-full pl-10 p-3 border rounded-xl"
                />
              </div>
            </div>

            {/* Mobile */}
            <div>
              <label className="block mb-2 font-medium">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-gray-400" size={18}/>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  className="w-full pl-10 p-3 border rounded-xl"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium">
                Company Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={18}/>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="employee@company.com"
                  className="w-full pl-10 p-3 border rounded-xl"
                />
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="block mb-2 font-medium">
                Department
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 text-gray-400" size={18}/>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Enter department"
                  className="w-full pl-10 p-3 border rounded-xl"
                />
              </div>
            </div>

            {/* Employee ID */}
            <div>
              <label className="block mb-2 font-medium">
                Employee ID
              </label>
              <div className="bg-yellow-100 text-yellow-700 font-semibold p-3 rounded-xl">
                {formData.employeeId}
              </div>
            </div>

            {/* Blood Group */}
            <div>
              <label className="block mb-2 font-medium">
                Blood Group
              </label>
              <select
                name="blood"
                value={formData.blood}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
              >
                <option value="">Select Blood Group</option>
                <option>A+</option>
                <option>B+</option>
                <option>O+</option>
                <option>AB+</option>
              </select>
            </div>

            {/* Role */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
              >
                <option value="">Select Role</option>
                <option>Admin</option>
                <option>Manager</option>
                <option>Employee</option>
                <option>Vendor Manager</option>
                <option>Store Keeper</option>
              </select>
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600"
            >
              Register Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;