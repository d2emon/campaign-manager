interface PaperProps {
  className?: string;
  title?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Paper = ({ className, onClick, children, title }: PaperProps) => {
  return (
    <div
      className={`bg-white shadow rounded-lg p-6 overflow-hidden ${className}`}
      onClick={onClick}
    >
      {title && <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>}
      {children}
    </div>
  );
};

export default Paper;
