import React from 'react';
import { 
  BarChart3, 
  User, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Award, 
  LogOut
} from 'lucide-react';
import {  cn } from '@/lib/utils';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'performance', label: 'Student Performance', icon: TrendingUp },
  { id: 'timetable', label: 'Timetable', icon: Clock },
  { id: 'achievements', label: 'Achievements & Approval', icon: Award },
];

const SidebarItem = ({ item, isActive, onClick }) => {
  const Icon = item.icon;

  return (
    <button
      onClick={() => onClick(item.id)}
      className={cn(
        "relative w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium",
        isActive 
          ? "text-white bg-gradient-to-r from-[#f2f6fc]/40 to-transparent font-semibold" 
          : "text-gray-300 hover:text-white hover:bg-white/10"
      )}
    >
      {isActive && (
        <span className="absolute left-0 top-0 h-full w-1.5 bg-[#f2f6fc] rounded-r-md" />
      )}
      <Icon
        className={cn(
          "transition-all duration-200",
          isActive ? "h-6 w-6 text-white" : "h-5 w-5"
        )}
      />
      <span>{item.label}</span>
    </button>
  );
};

const FacultySidebar = ({ activeItem, onItemClick, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-[#1e293b] transition-transform duration-300 lg:translate-x-0 lg:flex lg:flex-col select-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center px-6 py-7 border-b border-white/10">
          <BarChart3 className="h-6 w-6 text-white mr-3" />
          <h2 className="text-lg font-bold text-white">Talentnotion</h2>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {menuItems.map((item , index) => (
            <SidebarItem
              key={index}
              item={item}
              isActive={activeItem === item.id}
              onClick={onItemClick}
            />
          ))}
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/10 mx-4" />
        <div className="p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-red-400 hover:bg-red-500/20">
            <LogOut className="h-5 w-5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default FacultySidebar;
