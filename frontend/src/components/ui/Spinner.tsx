interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Spinner = ({ size = 'md', className = '' }: SpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-2'
  };

  return (
    <div 
      className={`
        animate-spin 
        rounded-full 
        border-t-primary
        border-r-primary/30
        border-b-primary/30 
        border-l-primary/30
        ${sizeClasses[size]}
        ${className}
      `}
    />
  );
};

export default Spinner;
