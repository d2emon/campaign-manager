import Badge from 'components/ui/Badge';
import CampaignItem from 'components/ui/CampaignItem';
import DataMap from 'components/ui/DataMap';
import Locations from 'components/ui/Locations';
import { Location } from '../types/location';

interface LocationDetailsProps {
  location: Location;
  isLoading?: boolean;
  onDelete: () => void;
  onEdit: () => void;
}

const LocationDetails = ({
  location,
  isLoading,
  onDelete,
  onEdit,
}: LocationDetailsProps) => {
  return (
    <CampaignItem
      isLoading={isLoading}
      title={location.name}
      onEdit={onEdit}
      onDelete={onDelete}
    >
      <div className="mb-6">
        { location.type && <Badge variant="primary">{location.type}</Badge> }
      </div>

      <div className="mb-6">
        <DataMap title="Карта" image={location.mapImage} />
      </div>

      {location.markers && (
        <div className="mb-6">
          <Locations title="Отметки" markers={location.markers} />
        </div>
      )}
    </CampaignItem>
  );
};

export default LocationDetails;
