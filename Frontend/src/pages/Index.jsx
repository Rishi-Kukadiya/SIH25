import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import { Popup } from "../Components/ui/popup";

const Index = () => {
  const [success, setSuccess] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const location = useLocation();
  const messages = location.state?.message || "";

  useEffect(() => {
    if (messages) {
      setSuccess(messages);
      setShowSuccessPopup(true);
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-[#f2f6fc]">
      <Navbar />

      <div className="flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Welcome to <span className="text-primary">Wardiere</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Your gateway to seamless authentication and user management. Join
            our community with secure and elegant authentication.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup">
              <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-medium px-8 py-3 rounded-full shadow-soft">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-full"
              >
                Sign In
              </Button>
            </Link>
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
    </div>
  );
};

export default Index;
