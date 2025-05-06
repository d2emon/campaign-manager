import { ReactNode } from 'react';

interface DataBlockProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

const DataBlock = ({ children, title, className = '' }: DataBlockProps) => {
  return (
    <div className={`mt-6 pt-6 border-t border-gray-200 ${className}`}>
      {title && (
        <h2 className="text-lg font-medium text-gray-900 mb-4">{title}</h2>
      )}
      <div className="text-gray-700">
        {children}
      </div>
    </div>
  );
};

export default DataBlock;
