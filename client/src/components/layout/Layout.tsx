import { type ReactNode } from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  showNav?: boolean;
  showHeader?: boolean;
}

function Layout({
  children,
  title,
  showBack = false,
  showNav = true,
  showHeader = true,
}: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {showHeader && <Header title={title} showBack={showBack} showMenu={!showBack} />}
      <main className={cn('flex-1', showNav && 'pb-20')}>
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
}

// Helper for cn since we're using it here
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export { Layout };
