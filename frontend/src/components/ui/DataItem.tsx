import { ReactNode } from 'react';
import { Box, Text } from '@mantine/core';

interface DataItemProps {
  label?: string | ReactNode;
  children?: ReactNode;
  className?: string;
}

const DataItem = ({ label, children, className = '' }: DataItemProps) => {
  return (
    <Box className={`${className}`}>
      <Text className="text-sm font-medium text-gray-500">{label}</Text>
      <Text className="mt-1 text-sm text-gray-900">{children}</Text>
    </Box>
  );
};

export default DataItem;
