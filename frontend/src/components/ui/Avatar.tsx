import { ReactNode } from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  fallback?: ReactNode;
  className?: string;
}

const Avatar = ({ 
  src, 
  alt = '', 
  size = 'md',
  fallback,
  className = '' 
}: AvatarProps) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24',
    xxl: 'h-48 w-48'
  };

  if (!src && !fallback) {
    return (
      <div 
        className={`
          bg-gray-200 
          rounded-full 
          flex 
          items-center 
          justify-center
          ${sizeClasses[size]}
          ${className}
        `}
      >
        <span className="text-gray-500">
          {alt?.charAt(0)?.toUpperCase() || '?'}
        </span>
      </div>
    );
  }

  if (!src && fallback) {
    return (
      <div 
        className={`
          rounded-full 
          flex 
          items-center 
          justify-center
          ${sizeClasses[size]}
          ${className}
        `}
      >
        {fallback}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`
        rounded-full 
        object-cover
        ${sizeClasses[size]}
        ${className}
      `}
    />
  );
};

export default Avatar;
