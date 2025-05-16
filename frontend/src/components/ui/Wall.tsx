import { ReactNode, useEffect, useRef, useState } from 'react';
import { Flex } from '@mantine/core';

interface WallProps {
  className?: string;
  empty?: ReactNode;
  items?: ReactNode[];
}

const Wall = ({
  className,
  empty = null,
  items = [],
}: WallProps) => {
  const wallRef = useRef<HTMLDivElement>(null);

  const [columns, setColumns] = useState<ReactNode[][]>([[], [], []]);

  const minHeight = 128
  const minWidth = 300;

  const hasItems = items && items.length > 0;

  useEffect(() => {
    const calculateColumns = () => {
      if (!items) return;

      if (!wallRef.current) return;

      const wallWidth = wallRef.current.offsetWidth;
      const columnCount = Math.max(1, Math.floor(wallWidth / minWidth));
      const newColumns: any[][] = Array(columnCount).fill(null).map(() => []);

      items.forEach((item: ReactNode) => {
        const shortestColumn = newColumns.reduce(
          (shortest, current, index) => {
            const currentHeight = current.reduce(
              (sum, columnItem, columnItemIndex) => sum + Math.max(0, minHeight),
              0,
            );
            const shortestHeight = shortest.height;
            return currentHeight < shortestHeight
              ? { index, height: currentHeight }
              : shortest;
          },
          { index: 0, height: Infinity }
        );

        newColumns[shortestColumn.index].push(item);
      });

      setColumns(newColumns);
    };

    calculateColumns();
    window.addEventListener('resize', calculateColumns);

    return () => {
      window.removeEventListener('resize', calculateColumns);
    };
  }, [items]);

  if (!hasItems) {
    return (
      <div className="text-center text-gray-500 py-4">
        {empty}
      </div>
    );
  }

  return (
    <div
      className={`flex gap-4 ${className}`}
      ref={wallRef}
    >
      {columns.map((column, index) => (
        <Flex
          key={index}
          className="flex-1"
          direction="column"
          gap="md"
        >
          {column}
        </Flex>
      ))}
    </div>
  );
};

export default Wall;
