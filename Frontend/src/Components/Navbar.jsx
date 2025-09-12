import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="w-full bg-card border-b border-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">
          Wardiere
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            HOME
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">
            ABOUT US
          </Link>
          <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
            CONTACT
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {location.pathname === "/login" ? (
            <Link to="/signup">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                SIGN UP
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                LOG IN
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;