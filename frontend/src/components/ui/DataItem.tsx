import { ReactNode } from 'react';
import { Box, Group, Text } from '@mantine/core';

interface DataItemProps {
  label?: string | ReactNode;
  children?: ReactNode;
  className?: string;
}

const DataItem = ({ label, children, className = '' }: DataItemProps) => {
  return (
    <Group className={`${className}`}>
      <Text className="text-sm font-medium text-gray-500">{label}</Text>
      <Box className="mt-1 text-sm text-gray-900">{children}</Box>
    </Group>
  );
};

export default DataItem;
