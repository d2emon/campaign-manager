import { ReactNode } from 'react';

interface DataItemProps {
  label: string;
  children: ReactNode;
  className?: string;
}

const DataItem = ({ label, children, className = '' }: DataItemProps) => {
  return (
    <div className={`${className}`}>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{children}</dd>
    </div>
  );
};

export default DataItem;
