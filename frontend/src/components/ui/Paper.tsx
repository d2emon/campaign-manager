interface PaperProps {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const Paper = ({ className, onClick, children }: PaperProps) => {
  return (
    <div
      className={`bg-white shadow rounded-lg p-6 overflow-hidden ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Paper;
