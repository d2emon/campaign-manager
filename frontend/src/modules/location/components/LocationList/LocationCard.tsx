import { Button, Card } from '@mantine/core';
import { Location } from '../../types/location';

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
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {location.name}
          </h3>
          <p className="text-sm text-gray-600">
            {location.type}
          </p>
        </div>
        <div className="flex items-center space-x-2">
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
        </div>
      </div>
      <div className="mt-2">
        <p className="text-sm text-gray-600">
          {location.type}
        </p>
      </div>
    </Card>
  );
};

export default LocationCard;
