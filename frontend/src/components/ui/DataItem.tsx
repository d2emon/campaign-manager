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
      <Text size="sm" className="text-gray-500">{label}</Text>
      <Box className="text-gray-900">{children}</Box>
    </Group>
  );
};

export default DataItem;
