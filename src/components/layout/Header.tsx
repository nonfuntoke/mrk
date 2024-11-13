import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, User as UserIcon, CreditCard, LogOut } from 'lucide-react';

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed top-0 left-0 right-0 z-50">
      <div className="container h-full flex items-center">
        <div className="flex-1 flex items-center pl-12">
          <img
            src="https://emailbounce.org/wp-content/uploads/2024/10/2.svg"
            alt="EmailCleaner"
            className="h-12"
          />
        </div>

        <div className="flex items-center gap-6">
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex h-9"
            onClick={() => navigate('/credits')}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            <span>100 Credits</span>
          </Button>

          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Bell className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <UserIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <UserIcon className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/credits')}>
                <CreditCard className="mr-2 h-4 w-4" />
                Buy Credits
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/login')}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
