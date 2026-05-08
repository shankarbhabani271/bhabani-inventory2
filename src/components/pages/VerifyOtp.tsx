import React, { useState } from "react";
import { ShieldCheck } from "lucide-react";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto move next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleVerify = () => {
    const finalOtp = otp.join("");
    console.log("Entered OTP:", finalOtp);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="bg-yellow-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="text-yellow-500" size={28} />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Verify OTP
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Enter the OTP sent to your email
          </p>
        </div>

        {/* OTP Input Boxes */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
              className="w-12 h-12 text-center text-xl font-bold border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          ))}
        </div>

        {/* Timer */}
        <p className="text-center text-sm text-gray-500 mb-4">
          OTP valid for <span className="text-yellow-500 font-bold">5 minutes</span>
        </p>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600"
        >
          Verify OTP
        </button>

        {/* Resend */}
        <p className="text-center text-sm mt-4 text-gray-500">
          Didn’t receive OTP?{" "}
          <span className="text-blue-600 cursor-pointer">
            Resend
          </span>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;