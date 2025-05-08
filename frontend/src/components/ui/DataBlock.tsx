import { Box, SimpleGrid, Title } from '@mantine/core';
import { ReactNode } from 'react';

interface DataBlockProps {
  children?: ReactNode;
  title?: string;
  className?: string;
}

const DataBlock = ({ children, title, className = '' }: DataBlockProps) => {
  return (
    <Box className={`mt-6 pt-6 border-t border-gray-200 ${className}`}>
      {title && (
        <Title order={4} className="text-gray-900 mb-4">{title}</Title>
      )}
      <Box className="text-gray-700">
        <SimpleGrid cols={2}>
          {children}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default DataBlock;
