import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  History,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Upload,
  Code,
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Upload, label: 'Validate Emails', path: '/validate' },
  { icon: History, label: 'History', path: '/history' },
  { icon: Code, label: 'API Integration', path: '/api' },
  { icon: CreditCard, label: 'Credits', path: '/credits' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={cn(
        'h-screen fixed left-0 top-0 z-40 flex flex-col border-r bg-background transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-14 items-center justify-between border-b px-3">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <img 
              src="https://emailbounce.org/wp-content/uploads/2024/10/2.svg" 
              alt="EmailCleaner" 
              className="h-6"
            />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8", collapsed ? "mx-auto" : "ml-auto")}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.path}
              variant={isActive ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start h-10',
                collapsed ? 'px-2' : 'px-3',
                isActive && 'bg-primary/10 hover:bg-primary/15'
              )}
              onClick={() => navigate(item.path)}
            >
              <Icon className={cn('h-4 w-4', collapsed ? 'mr-0' : 'mr-2')} />
              {!collapsed && <span>{item.label}</span>}
            </Button>
          );
        })}
      </nav>
    </div>
  );
}