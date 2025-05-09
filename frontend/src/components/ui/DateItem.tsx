import { useMemo } from 'react';
import { Text } from '@mantine/core';
 
interface DateItemProps {
  label?: string;
  date?: string | Date;
  className?: string;
  format?: Intl.DateTimeFormatOptions;
}

const DateItem = ({ 
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

  return <Text className={className} size="sm">{formattedDate}</Text>;
};

export default DateItem;
