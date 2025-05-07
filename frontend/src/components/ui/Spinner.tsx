interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Spinner = ({ size = 'md', className = '' }: SpinnerProps) => {
  const baseClasses = 'animate-spin rounded-full border-primary';
  const sizeClasses = {
    sm: 'h-4 w-4 border-t border-b ',
    md: 'h-8 w-8 border-t-2 border-b-2 ',
    lg: 'h-12 w-12 border-t-2 border-b-2 '
  };

  return (
    <div className={[baseClasses, sizeClasses[size], className].join(' ')} />
  );
};

export default Spinner;
