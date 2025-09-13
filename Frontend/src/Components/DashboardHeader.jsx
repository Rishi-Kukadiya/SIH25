import React from 'react';
import { Search, Bell, Menu, Globe, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const DashboardHeader = ({ onToggleSidebar, isMobile = false }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/dashboard/profile');
  };

  return (
    <header className="bg-card border-b border-border px-4 lg:px-6 pt-4 py-3 ">
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="lg:hidden hover:bg-muted"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          
          <div className="hidden lg:block">
            <h1 className="text-2xl font-bold text-foreground">
              Hello Nada 👋
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Let's teach something new today!
            </p>
          </div>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className={cn(
                "w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                "transition-all duration-200 hover:bg-muted/70"
              )}
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-muted transition-colors duration-200"
          >
            <Bell className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            className="hidden md:flex"
            onClick={handleProfileClick}
          >
            Profile
          </Button>
        </div>
      </div>
      
      {/* Mobile greeting */}
      <div className="lg:hidden mt-4">
        <h1 className="text-xl font-bold text-foreground">
          Hello Nada 👋
        </h1>
        <p className="text-sm text-muted-foreground">
          Let's teach something new today!
        </p>
      </div>
    </header>
  );
};

export default DashboardHeader;
