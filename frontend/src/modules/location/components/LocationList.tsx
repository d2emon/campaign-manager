import { useNavigate } from 'react-router-dom';
import Button from 'components/ui/Button';
import Paper from 'components/ui/Paper';
import { Location } from '../types/location';

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

  const handleLocationClick = (locationId: string) => {
    navigate(`/campaigns/${campaignId}/locations/${locationId}`);
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
      {locations && locations.length > 0 ? (
        <div className="space-y-4">
          {locations.map((location) => (
            <Paper
              key={location.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleLocationClick(location.id)}
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
                  {onEdit && (
                    <Button
                      variant="secondary"
                      onClick={() => onEdit(location)}
                    >
                      Редактировать
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="danger"
                      onClick={() => onDelete(location)}
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
            </Paper>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-4">
          В этой кампании пока нет локаций
        </div>
      )}
    </Paper>
  );
};

export default LocationList;
