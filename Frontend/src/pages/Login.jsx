import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import loginIllustration from "@/assets/login-illustration.jpg";
import { Popup } from "../Components/ui/popup";
import { useDispatch , useSelector } from "react-redux";
import { loginUser } from "../Slices/Auth/Login.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.Login)
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const location = useLocation();
  const messages = location.state?.message || "";
  const email = location.state?.email || "";
  const password = location.state?.password || "";

  useEffect(() => {
    if (messages) {
      setSuccess(messages);
      setShowSuccessPopup(true);
      setFormData((prev) => ({
        ...prev,
        username: email,
        password: password,
      }));
    }
  }, [messages, email, password]);

  const validateForm = () => {
    if (!formData.username.trim()) {
      setErrors("Username is required");
      setShowErrorPopup(true);
      return false;
    }

    if (!formData.password) {
      setErrors("Password is required");
      setShowErrorPopup(true);
      return false;
    }

    setErrors(""); 
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        const data = new FormData();
        data.append("email" , formData.username);
        data.append("password" , formData.password);

        dispatch(loginUser(data))
        .unwrap()
        .then((res) =>{
          setSuccess(res.message);
          setShowSuccessPopup(true);
          navigate('/' , {state : {message : res.message}});
        })
        .catch((error) =>{
          setErrors(error);
          setShowErrorPopup(true);
        });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors) {
      setErrors("");
    }
  };

  if(loading){
    return(
      <>
        <p>This is Shimming effect!!</p>
      </>
    )
  }

  return (
    <div className="h-screen bg-[#f2f6fc] flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-6xl bg-card rounded-2xl shadow-card overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Form Section */}
            <div className="p-8 lg:p-12">
              <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold text-foreground mb-8">
                  Log in
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Username */}
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={formData.username}
                      onChange={(e) =>
                        handleInputChange("username", e.target.value)
                      }
                      className="w-full bg-muted border-0 rounded-full px-4 py-3"
                      placeholder="Enter your username"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className="w-full bg-muted border-0 rounded-full px-4 py-3 pr-12"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me + Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) =>
                          handleInputChange("rememberMe", checked)
                        }
                      />
                      <Label htmlFor="remember">Remember Me</Label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-sm hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Submit */}
                  <Button type="submit" className="w-full rounded-full">
                    Log in
                  </Button>

                  <div className="text-center">
                    <span>or </span>
                    <Link to="/signup" className="text-primary hover:underline">
                      Sign up
                    </Link>
                  </div>
                </form>
              </div>
            </div>

            {/* Illustration Section */}
            <div className="hidden lg:flex items-center justify-center bg-accent/30 p-12">
              <img
                src={loginIllustration}
                alt="Login illustration"
                className="w-full h-auto max-w-md rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {showSuccessPopup && (
        <Popup
          type="success"
          message={success || "Login successfully!"}
          onClose={() => setShowSuccessPopup(false)}
        />
      )}

      {showErrorPopup && (
        <Popup
          type="error"
          message={errors || "Something went wrong!"}
          onClose={() => setShowErrorPopup(false)}
        />
      )}
    </div>
  );
};

export default Login;
