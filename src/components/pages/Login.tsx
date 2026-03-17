import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginSuccess } from "@/store/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginImage from "../../assets/upscaled_image.png";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showpassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //login function
  const handleLogin = () => {
    // email format regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // check email format
    if (!emailPattern.test(data.email)) {
      alert("Please enter valid email format");
      return;
    }

    // check password
    if (!data.password) {
      alert("Please enter password");
      return;
    }

    // login success
    const response = {
      token: "jwt_TOKEN_123456",
    };

    dispatch(loginSuccess(response.token));
    navigate("/");
  };

  return (
   <div className="flex h-screen">

  {/* LEFT SIDE (FORM) */}
  <div className="w-full lg:w-[35%] flex items-center justify-center bg-blue-100">
    <Card className="w-[90%] max-w-[350px] shadow-lg">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        
        {/* Email */}
        <div>
          <label>Email :</label>
          <Input
            type="email"
            placeholder="Enter Email"
            name="email"
            value={data.email}
            onChange={handleOnchange}
          />
        </div>

        {/* Password */}
        <div>
          <label>Password :</label>

          <div className="bg-slate-100 p-2 flex items-center rounded-md">
            <input
              type={showpassword ? "text" : "password"}
              placeholder="Enter Password"
              name="password"
              value={data.password}
              onChange={handleOnchange}
              className="w-full outline-none bg-transparent"
            />

            <div
              className="cursor-pointer text-lg"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showpassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <Link
            to="/forgot-password"
            className="block w-fit ml-auto hover:underline hover:text-red-600"
          >
            Forgot Password ?
          </Link>
        </div>

        <Button
          className="w-full bg-blue-600"
          onClick={handleLogin}
          disabled={!data.email || !data.password}
        >
          Login
        </Button>

      </CardContent>
    </Card>
  </div>

  {/* RIGHT SIDE IMAGE */}
  <div className="hidden lg:block w-[65%] h-full">
    <img
      src={loginImage}
      alt="login"
      className="w-full h-full object-cover"
    />
  </div>

</div>
  );
};

export default Login;
