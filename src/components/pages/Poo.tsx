import React, { useState } from "react";

function PurchaseRequest() {
  const [items, setItems] = useState([
    { productName: "", qty: 1, price: 0 }
  ]);

  const addItem = () => {
    setItems([
      ...items,
      { productName: "", qty: 1, price: 0 }
    ]);
  };

  const removeItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const totalQty = items.reduce(
    (sum, item) => sum + Number(item.qty),
    0
  );

  const totalAmount = items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  return (
    <div className="p-4 md:p-6 min-h-screen">

  {/* Vendor Card */}
  <div className="bg-white border rounded-2xl p-4 md:p-6 mb-6">
    
    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
      
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-2xl font-bold">
          HP
        </div>

        <div>
          <h2 className="text-xl md:text-2xl font-bold">
            HP Solutions
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Laptops & Computers • Contact: Amit Verma • amit@hp.com
          </p>
        </div>
      </div>

      <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full w-fit">
        Active
      </span>
    </div>

    {/* Info Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <div className="bg-gray-100 p-4 rounded-xl">
        <p>Phone</p>
        <h3 className="font-bold">+91-9988776655</h3>
      </div>

      <div className="bg-gray-100 p-4 rounded-xl">
        <p>GST Number</p>
        <h3 className="font-bold">07HP9012H3X7</h3>
      </div>

      <div className="bg-gray-100 p-4 rounded-xl">
        <p>Location</p>
        <h3 className="font-bold">Delhi, India</h3>
      </div>
    </div>
  </div>

  {/* Purchase Form */}
  <div className="bg-white border rounded-2xl p-4 md:p-6">
    
    <h1 className="text-xl md:text-2xl font-bold mb-6">
      New Purchase Request
    </h1>

    {/* Dates */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <input type="date" className="border p-3 rounded-lg w-full" />
      <input type="date" className="border p-3 rounded-lg w-full" />
    </div>

    {/* Department */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <select className="border p-3 rounded-lg w-full">
        <option>Select Department</option>
      </select>

      <input
        type="text"
        placeholder="Requested By"
        className="border p-3 rounded-lg w-full"
      />
    </div>

    {/* Priority */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <button className="border p-3 rounded-lg">Low</button>
      <button className="border p-3 rounded-lg">Medium</button>
      <button className="border p-3 rounded-lg">High</button>
    </div>

    {/* Items */}
    {items.map((item, index) => (
      <div
        key={index}
        className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4"
      >
        <input
          type="text"
          placeholder="Product Name"
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Qty"
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Price"
          className="border p-3 rounded-lg"
        />

        <div className="flex items-center font-bold">
          ₹0
        </div>

        <button className="border rounded-lg px-4 py-2">
          X
        </button>
      </div>
    ))}

    <button className="border px-4 py-2 rounded-lg mb-6">
      + Add Item
    </button>

    {/* Delivery */}
    <input
      type="text"
      placeholder="Delivery Address"
      className="w-full border p-3 rounded-lg mb-4"
    />

    <textarea
      rows="4"
      placeholder="Special instructions"
      className="w-full border p-3 rounded-lg mb-6"
    ></textarea>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row justify-end gap-4">
      <button className="px-6 py-2 border rounded-lg">
        Cancel
      </button>

      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">
        Send Request
      </button>
    </div>

  </div>
</div>
  );
}

export default PurchaseRequest;