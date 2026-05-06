import React, { useEffect, useState } from "react";
import axios from "axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

import {
  FileText,
  IndianRupee,
  ShoppingCart,
  Clock,
  Star,
  Package,
  UserPlus
} from "lucide-react";

/* ---------------- Dashboard Cards ---------------- */
const dashboardCards = [
  {
    title: "Open Requests",
    value: "24",
    subtitle: "+3 from yesterday",
    icon: FileText,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Pending Approvals",
    value: "8",
    subtitle: "-2 from yesterday",
    icon: IndianRupee,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Active POs",
    value: "12",
    subtitle: "+5 this week",
    icon: ShoppingCart,
    iconBg: "bg-purple-100",
    iconColor: "text-green-500",
  },
  {
    title: "Low Stock Items",
    value: "5",
    subtitle: "Requires attention",
    icon: Clock,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

 const requests = [
    {
      id: 1,
      product: "Laptop",
      vendor: "Dell Technologies",
      quantity: "10 units",
      expectedDate: "2024-12-10",
      notes: "Urgent — needed for new joiners",
      status: "Pending",
    },
    {
      id: 2,
      product: "Mouse",
      vendor: "Logitech India",
      quantity: "25 units",
      expectedDate: "2024-12-05",
      notes: "Standard delivery",
      status: "Delivered",
    },
  ];


/* ---------------- Performance Data ---------------- */
const topPerformers = [
  { rank: 1, name: "Prime Metals", category: "Steel & Metals", rating: 4.8 },
  { rank: 2, name: "ABC Supplies Ltd", category: "Steel & Metals", rating: 4.5 },
  { rank: 3, name: "XYZ Materials", category: "Construction", rating: 4.2 },
];

const orderVolume = [
  { name: "Prime Metals", orders: 234, pending: 5 },
  { name: "ABC Supplies Ltd", orders: 156, pending: 3 },
  { name: "XYZ Materials", orders: 89, pending: 1 },
];

/* ---------------- Page Component ---------------- */
const VendorsPage = () => {
  const [vendors, setVendors] = useState([]);
  const [activeTab, setActiveTab] = useState("all-vendors");
   const navigate = useNavigate();


  // FETCH DATA
  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/vendor/get");

      console.log("API:", res.data);

      if (Array.isArray(res.data)) {
        setVendors(res.data);
      } else if (res.data.vendors) {
        setVendors(res.data.vendors);
      } else {
        setVendors([]);
      }
    } catch (error) {
      console.log("ERROR:", error);
      setVendors([]);
    }
  };

  return (
    <div className="p-4 space-y-6 bg-blue-50 min-h-screen">
        

       <div className="flex justify-between items-center">
  
  {/* Left Section */}
  <div>
    <h1 className="text-2xl font-black">
      Vendors Management
    </h1>
    <p className="text-xl text-gray-600">
      Manage suppliers and purchase requests
    </p>
  </div>

  {/* Right Section */}
  <div>
    <button 
     onClick={() => setActiveTab("add-vendor")}
    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
      <UserPlus className="text-white" size={20} />
      
      <span>
        Add Vendors
      </span>
    </button>
  </div>

</div>
      {/* Dashboard Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex justify-between items-center pb-2">
                <CardTitle className="text-sm">{card.title}</CardTitle>
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${card.iconBg}`}>
                  <Icon className={`h-5 w-5 ${card.iconColor}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{card.value}</div>
                <p className="text-sm text-muted-foreground">{card.subtitle}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all-vendors"  value={activeTab} onValueChange={setActiveTab}>

  <TabsList className="bg-slate-300 text-black">

    <TabsTrigger value="all-vendors">
      All Vendors
    </TabsTrigger>

    <TabsTrigger value="add-vendor">
      Add Vendor
    </TabsTrigger>

    <TabsTrigger value="purchase-request">
      Purchase Request
    </TabsTrigger>

  </TabsList>

  {/* -------- All Vendors Tab -------- */}
  <TabsContent value="all-vendors" className="mt-6">
      <div className="max-w-6xl mx-auto border rounded-2xl p-6 bg-white shadow-sm">

      {/* Top Section */}
      <div className="flex justify-between items-start">
        
        {/* Left Side */}
        <div className="flex items-center gap-4">
          
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">
            DT
          </div>

          {/* Vendor Info */}
          <div>
            <h2 className="text-3xl font-semibold">
              Dell Technologies
            </h2>
            <p className="text-gray-600 text-xl">
              Laptops & Computers
            </p>
          </div>
        </div>

        {/* Status */}
        <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full font-medium">
          Active
        </span>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        
        <div>
          <p className="text-gray-500 text-lg">Contact person</p>
          <h3 className="font-semibold text-xl">Rajesh Kumar</h3>

          <p className="text-gray-500 text-lg mt-4">Email</p>
          <h3 className="font-semibold text-xl">rajesh@dell.com</h3>

          <p className="text-gray-500 text-lg mt-4">Address</p>
          <h3 className="font-semibold text-xl">
            Bangalore, Karnataka, India
          </h3>
        </div>

        <div>
          <p className="text-gray-500 text-lg">Phone</p>
          <h3 className="font-semibold text-xl">
            +91-9876543210
          </h3>

          <p className="text-gray-500 text-lg mt-4">GST</p>
          <h3 className="font-semibold text-xl">
            29DELL1234F1Z5
          </h3>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6" />

      {/* Buttons */}
      <div className="flex gap-4">
        
        <button 
        onClick={() => navigate("/poo")}

        className="px-6 py-3 border rounded-xl hover:bg-gray-100">
          Create PO
        </button>

        <button className="px-6 py-3 border rounded-xl hover:bg-red-100 text-red-600">
          Remove
        </button>
      </div>
    </div>
  </TabsContent>

  {/* -------- Add Vendor Tab -------- */}
  <TabsContent value="add-vendor" className="mt-6">
  <div className="w-full min-h-screen  p-3 sm:p-4 md:p-6">
  
  <div className="w-full max-w-5xl mx-auto bg-white border rounded-2xl shadow-sm p-4 sm:p-5 md:p-6 lg:p-8">

    {/* Heading */}
    <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-center sm:text-left">
      Add New Vendor
    </h1>

    <form>
      
      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

        <div>
          <label className="block text-sm sm:text-base md:text-lg font-medium mb-2">
            Vendor Name *
          </label>
          <input
            type="text"
            placeholder="Dell Technologies"
            className="w-full border rounded-lg px-4 py-3 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base md:text-lg font-medium mb-2">
            Contact Person
          </label>
          <input
            type="text"
            placeholder="Rajesh Kumar"
            className="w-full border rounded-lg px-4 py-3 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base md:text-lg font-medium mb-2">
            Email *
          </label>
          <input
            type="email"
            placeholder="vendor@gmail.com"
            className="w-full border rounded-lg px-4 py-3 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base md:text-lg font-medium mb-2">
            Phone *
          </label>
          <input
            type="text"
            placeholder="+91 9876543210"
            className="w-full border rounded-lg px-4 py-3 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base md:text-lg font-medium mb-2">
            Product Type *
          </label>
          <select className="w-full border rounded-lg px-4 py-3 text-sm sm:text-base">
            <option>Select Category</option>
            <option>Laptop</option>
            <option>Monitor</option>
            <option>Keyboard</option>
          </select>
        </div>

        <div>
          <label className="block text-sm sm:text-base md:text-lg font-medium mb-2">
            GST Number
          </label>
          <input
            type="text"
            placeholder="29ABCDE1234F1Z5"
            className="w-full border rounded-lg px-4 py-3 text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Address */}
      <div className="mt-6">
        <label className="block text-sm sm:text-base md:text-lg font-medium mb-2">
          Address *
        </label>
        <textarea
          rows="4"
          placeholder="Enter full address"
          className="w-full border rounded-lg px-4 py-3 text-sm sm:text-base"
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6">
        <button
          type="button"
          className="w-full sm:w-auto px-6 py-3 border rounded-lg"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Save Vendor
        </button>
      </div>

    </form>
  </div>
</div>
  </TabsContent>

  {/* -------- Purchase Request Tab -------- */}
  <TabsContent value="purchase-request" className="mt-6">
    <div className="p-4 md:p-6 min-h-screen">

      {/* Top Button */}
      <div className="flex justify-end mb-6">
        <button className="border px-5 py-2 rounded-xl text-lg font-medium hover:bg-gray-100">
          + New Purchase Request
        </button>
      </div>

      {/* Request Cards */}
      <div className="space-y-6">
        {requests.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-2xl p-4 md:p-6"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
              <div>
                <h2 className="text-2xl font-bold">
                  {item.product}
                </h2>
                <p className="text-gray-600">
                  Vendor: {item.vendor}
                </p>
              </div>

              <span
                className={`px-4 py-1 rounded-full font-medium w-fit ${
                  item.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {item.status}
              </span>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-100 p-4 rounded-xl">
                <p className="text-gray-600">Quantity</p>
                <h3 className="font-bold">{item.quantity}</h3>
              </div>

              <div className="bg-gray-100 p-4 rounded-xl">
                <p className="text-gray-600">Expected By</p>
                <h3 className="font-bold">{item.expectedDate}</h3>
              </div>

              <div className="bg-gray-100 p-4 rounded-xl">
                <p className="text-gray-600">Notes</p>
                <h3 className="font-bold">{item.notes}</h3>
              </div>
            </div>

            {/* Buttons only for Pending */}
            {item.status === "Pending" && (
              <div className="flex flex-col sm:flex-row gap-4 mt-6 border-t pt-4">
                <button className="px-5 py-2 border border-green-500 text-green-600 rounded-xl hover:bg-green-50">
                  Mark Delivered
                </button>

                <button className="px-5 py-2 border rounded-xl hover:bg-gray-100">
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </TabsContent>

</Tabs>
    </div>
  );
};

export default VendorsPage;