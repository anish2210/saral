import { useNavigate } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Bell } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

function Header({ title = 'Saral', showBack = false }: HeaderProps) {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between bg-surface px-4 shadow-sm">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="Go back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        )}
        <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-text-secondary" />
        </button>
        {user && (
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'h-9 w-9',
              },
            }}
          />
        )}
      </div>
    </header>
  );
}

export { Header };
