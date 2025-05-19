import { Badge } from '@mantine/core';

interface LocationTypeProps {
  type?: string;
}

const LocationType = ({ type }: LocationTypeProps) => {
  switch (type) {
    case 'city':
      return <Badge variant="primary">Город</Badge>;
    case 'dungeon':
      return <Badge variant="primary">Подземелье</Badge>;
    case 'forest':
      return <Badge variant="primary">Лес</Badge>;
    case 'tavern':
      return <Badge variant="primary">Таверна</Badge>;
    default:
      return null;
  }
};

export default LocationType;
