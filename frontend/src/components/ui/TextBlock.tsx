import { ReactNode } from 'react';

interface TextBlockProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

const TextBlock = ({ children, title, className = '' }: TextBlockProps) => {
  return (
    <div className={`prose max-w-none ${className}`}>
      {title && (
        <h2 className="text-lg font-medium text-gray-900 mb-4">{title}</h2>
      )}
      <div className="text-gray-700">
        {children}
      </div>
    </div>
  );
};

export default TextBlock;
