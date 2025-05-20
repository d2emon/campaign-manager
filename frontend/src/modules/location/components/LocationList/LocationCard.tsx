import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  Title,
} from '@mantine/core';
import { Location } from '../../types/location';
import LocationType from '../LocationType';

interface LocationCardProps {
  location?: Location;  
  campaignId?: string;
  className?: string;
  withDeleteButton?: boolean;
  withEditButton?: boolean;
  onClick?: (location: Location) => void;
  onDelete?: (location: Location) => void;
  onEdit?: (location: Location) => void;
}

const LocationCard = ({
  className = '',
  location,
  withDeleteButton = false,
  withEditButton = false,
  onClick,
  onEdit,
  onDelete,
}: LocationCardProps) => {
  const handleClick = (location: Location) => () => {
    if (onClick) {
      onClick(location);
    }
  };

  const handleDelete = (location: Location) => () => {
    if (onDelete) {
      onDelete(location);
    }
  };

  const handleEdit = (location: Location) => () => {
    if (onEdit) {
      onEdit(location);
    }
  };

  if (!location) {
    return (
      <Card
        className={`hover:shadow-md transition-shadow cursor-pointer ${className}`}
      >
        &nbsp;
      </Card>
    );
  }

  return (
    <Card
      className={`hover:shadow-md transition-shadow cursor-pointer ${className}`}
      onClick={handleClick(location)}
    >
      <Group justify="space-between" mb="md">
        <Group align="center">
          <div>
            <LocationType type={location.type} />
            <Title order={4}>{location.name}</Title>
          </div>
          {!location.isPublic && (
            <Badge color="red" size="sm">
              Скрытый блок
            </Badge>
          )}
        </Group>
        <Group align="center">
          {withEditButton && (
            <Button
              variant="default"
              onClick={handleEdit(location)}
            >
              Редактировать
            </Button>
          )}
          {withDeleteButton && (
            <Button
              color="red"
              onClick={handleDelete(location)}
            >
              Удалить
            </Button>
          )}
        </Group>
      </Group>
      <Group mb="md">
        {location.tags?.map((tag) => (
          <Badge
            key={tag}
            variant="primary"
          >
            {tag}
          </Badge>
        ))}
      </Group>
      { location.mapImage && (<Image
        alt={location.name}
        radius="md"
        src={location.mapImage}
        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        h={200}
      />) }
    </Card>
  );
};

export default LocationCard;
