interface ButtonBlockProps {
  children: React.ReactNode;
  className?: string;
}

const ButtonBlock = ({ children, className }: ButtonBlockProps) => {
  return (
    <div className={`flex justify-end space-x-4 ${className || ''}`}>
      {children}
    </div>
  );
};

export default ButtonBlock;
