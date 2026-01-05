import { NavLink } from 'react-router-dom';
import { Home, Users, CreditCard, User } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/students', icon: Users, label: 'Students' },
  { to: '/payments', icon: CreditCard, label: 'Payments' },
  { to: '/profile', icon: User, label: 'Profile' },
];

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 border-t border-gray-200 bg-surface">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center gap-1 px-3 py-2',
                'text-xs font-medium transition-colors',
                isActive
                  ? 'text-primary-600'
                  : 'text-text-muted hover:text-text-secondary'
              )
            }
          >
            <Icon className="h-6 w-6" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export { BottomNav };
