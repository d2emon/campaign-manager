import { useMemo } from 'react';
import DataItem from './DataItem';

interface DateItemProps {
  label?: string;
  date?: string | Date;
  className?: string;
  format?: Intl.DateTimeFormatOptions;
}

const DateItem = ({ 
  label = '',
  date = '',
  className = '',
  format = { 
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
}: DateItemProps) => {
  const formattedDate = useMemo(() => {
    if (!date) return 'Неизвестно';
    return date instanceof Date 
      ? date.toLocaleDateString(undefined, format)
      : new Date(date).toLocaleDateString(undefined, format);
  }, [date, format]);

  return (
    <DataItem
      className={className}
      label={label}
    >
      {formattedDate}
    </DataItem>
  );
};

export default DateItem;
