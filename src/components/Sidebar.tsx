
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Building2, User, FileText, Users, BarChart3, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getNavigationItems = () => {
    if (user?.role === 'admin') {
      return [
        { href: '/admin/dashboard', label: 'Dashboard', icon: BarChart3 },
        { href: '/admin/employees', label: 'Manage Employees', icon: Users },
        { href: '/admin/announcements', label: 'Announcements', icon: FileText },
      ];
    } else {
      return [
        { href: '/employee/profile', label: 'My Profile', icon: User },
        { href: '/employee/announcements', label: 'Announcements', icon: FileText },
      ];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 flex flex-col h-full",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-accent rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-navy text-sm">Confidence FS</h2>
              <p className="text-xs text-gray-500">Employee Portal</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                  isActive 
                    ? "bg-blue-accent text-white" 
                    : "text-gray-700 hover:bg-gray-100",
                  isCollapsed && "justify-center"
                )}
              >
                <Icon className="w-5 h-5" />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        {!isCollapsed && user && (
          <div className="flex items-center gap-3 mb-3">
            <img
              src={user.photo || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face`}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
        )}
        
        <Button
          onClick={logout}
          variant="ghost"
          size="sm"
          className={cn(
            "w-full justify-start text-gray-700 hover:bg-red-50 hover:text-red-600",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut className="w-4 h-4" />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
