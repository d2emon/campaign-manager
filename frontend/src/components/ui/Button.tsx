interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  full?: boolean;
}
  
const Button = ({ variant = 'primary', full = false, children, ...props }: ButtonProps) => {
  const baseStyles = "px-4 py-2 text-sm font-medium border shadow-sm rounded-md transition disabled:opacity-50";
  const focusStyles = "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/80 border-transparent",
    secondary: "bg-white text-gray-700 border-gray-300 hover:bg-gray-50",
  };
  
  return (
    <button
      className={`${baseStyles} ${focusStyles} ${variants[variant]} ${full ? 'w-full' : ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
