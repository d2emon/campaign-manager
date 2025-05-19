import CampaignItem from 'components/ui/CampaignItem';
import DataMap from 'components/ui/DataMap';
import Locations from 'components/ui/Locations';
import LocationType from './LocationType';
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
      isPrivate={!location.isPublic}
      title={location.name}
      headSection={<LocationType type={location.type} />}
      tags={location.tags}
      createdAt={location.createdAt}
      updatedAt={location.updatedAt}
      withEdit
      withDelete
      onEdit={onEdit}
      onDelete={onDelete}
    >
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
