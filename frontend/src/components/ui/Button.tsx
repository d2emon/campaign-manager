interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  full?: boolean;
  ghost?: boolean;
}
  
const Button = ({ variant = 'primary', full = false, ghost = false, children, ...props }: ButtonProps) => {
  const styles = [];

  const baseStyles = "px-4 py-2 text-sm font-medium disabled:opacity-50";
  styles.push(baseStyles);

  const borderStyles = "border shadow-sm rounded-md transition";
  if (!ghost) {
    styles.push(borderStyles);
  }

  const focusStyles = "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary";
  styles.push(focusStyles);

  const variants = {
    primary: "bg-primary text-white hover:bg-primary/80 border-transparent",
    secondary: "bg-white text-gray-700 border-gray-300 hover:bg-gray-50",
    danger: "bg-red-600 text-white hover:bg-red-700 border-transparent",
  };
  const ghostVariants = {
    primary: "text-primary hover:text-primary/80",
    secondary: "text-gray-700 hover:text-gray-800",
    danger: "text-red-600 hover:text-red-800",
  };
  styles.push(ghost ? ghostVariants[variant] : variants[variant]);

  if (full) {
    styles.push("w-full");
  }

  return (
    <button
      className={styles.join(" ")}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
