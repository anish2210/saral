import { type ButtonHTMLAttributes } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FloatingActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

function FloatingActionButton({
  className,
  icon,
  ...props
}: FloatingActionButtonProps) {
  return (
    <button
      className={cn(
        'fixed bottom-20 right-4 z-20',
        'flex h-14 w-14 items-center justify-center',
        'rounded-full bg-primary-500 text-white shadow-lg',
        'hover:bg-primary-600 active:bg-primary-700',
        'transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        className
      )}
      {...props}
    >
      {icon || <Plus className="h-6 w-6" />}
    </button>
  );
}

export { FloatingActionButton };
