import { useNavigate } from 'react-router-dom';
import Button from 'components/ui/Button';
import Paper from 'components/ui/Paper';
import Wall from 'components/ui/Wall';
import { Location } from '../types/location';
import LocationCard from './LocationCard';

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
    navigate(`/campaigns/${campaignId}/locations/${location.id}`);
  };

  return (
    <Paper className={className}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Локации кампании</h2>
        {withAddButton && (
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="primary"
              onClick={onAdd}
            >
              Добавить локацию
            </Button>
          </div>
        )}
      </div>
      <Wall
        empty="В этой кампании пока нет локаций"
        items={locations && locations.map((location) => (
          <LocationCard
            key={location.id}
            location={location}
            onClick={handleLocationClick}
            withDeleteButton={!!onDelete}
            onDelete={onDelete}
            withEditButton={!!onEdit}
            onEdit={onEdit}
          />
        ))}
      />
    </Paper>
  );
};

export default LocationList;
