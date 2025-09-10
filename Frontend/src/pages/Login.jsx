import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import loginIllustration from "@/assets/login-illustration.jpg";
import { Popup } from "../Components/ui/popup";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});

  // ✅ Move popup states INSIDE component
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const validateForm = () => {
    let newErrors ;

    if (!formData.username.trim()) {
      newErrors = "Username is required";
      setErrors(newErrors);
      setShowErrorPopup(true);
      return false;
    }

    if (!formData.password) {
      newErrors = "Password is required";
      setErrors(newErrors);
      setShowErrorPopup(true);
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Login form submitted:", formData);

      // ✅ Show success popup
      setShowSuccessPopup(true);

      // Simulate login logic (e.g., API call)
      // Reset form if you want
      // setFormData({ username: "", password: "", rememberMe: false });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="h-screen bg-[#f2f6fc] flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-6xl bg-card rounded-2xl shadow-card overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Form Section */}
            <div className="p-8 lg:p-12">
              <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold text-foreground mb-8">Log in</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Username */}
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      className={`w-full bg-muted border-0 rounded-full px-4 py-3 `}
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
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className={`w-full bg-muted border-0 rounded-full px-4 py-3 pr-12`}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
                    <Link to="/forgot-password" className="text-sm hover:underline">
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
          message="Login successfully!"
          onClose={() => setShowSuccessPopup(false)}
        />
      )}


      {showErrorPopup && (
        <Popup
          type="error"
          message={errors}
          onClose={() => setShowErrorPopup(false)}
        />
      )}
    </div>
  );
};

export default Login;
