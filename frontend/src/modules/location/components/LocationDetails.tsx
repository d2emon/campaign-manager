import CampaignItem from 'components/ui/CampaignItem';
import Locations from 'components/ui/Locations';
import LocationType from './LocationType';
import { Location } from '../types/location';
import { Image } from '@mantine/core';

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
      { location.mapImage && (
        <Image
          radius="md"
          src={location.mapImage}
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        />
      ) }

      {location.markers && (
        <div className="mb-6">
          <Locations title="Отметки" markers={location.markers} />
        </div>
      )}
    </CampaignItem>
  );
};

export default LocationDetails;
