import { useNavigate } from 'react-router-dom';
import { Plus } from 'react-feather';
import { Box, Button, Group, Title } from '@mantine/core';
import Wall from 'components/ui/Wall';
import LocationCard from './LocationCard';
import { Location } from '../../types/location';

interface LocationListProps {
  locations?: Location[];
  campaignId?: string;
  className?: string;
  withAddButton?: boolean;
  onAdd?: () => void;
  onEdit?: (location: Location) => void;
  onDelete?: (location: Location) => void;
}

const LocationList = ({ locations, campaignId = '', className, withAddButton = false, onAdd, onEdit, onDelete }: LocationListProps) => {
  const navigate = useNavigate();

  const handleLocationClick = (location: Location) => {
    navigate(`/campaigns/${campaignId}/locations/${location.slug}`);
  };

  return (
    <Box className={className}>
      <Group justify="space-between" mb="md">
        <Title order={3}>Локации кампании</Title>
        {withAddButton && (
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="primary"
              leftSection={<Plus size={16} />}
              onClick={onAdd}
            >
              Добавить локацию
            </Button>
          </div>
        )}
      </Group>
      <Wall
        empty="В этой кампании пока нет локаций"
        items={locations && locations.map((location) => (
          <LocationCard
            key={location.slug}
            location={location}
            onClick={handleLocationClick}
            withDeleteButton={!!onDelete}
            onDelete={onDelete}
            withEditButton={!!onEdit}
            onEdit={onEdit}
          />
        ))}
      />
    </Box>
  );
};

export default LocationList;
