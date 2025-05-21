import { useEffect, useState } from 'react';
import { Image } from '@mantine/core';
import CampaignItem from 'components/ui/CampaignItem';
import LocationMap from 'components/ui/LocationMap';
import Locations from 'components/ui/Locations';
import { Location, Marker } from '../types/location';
import LocationType from './LocationType';

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
  const [markers, setMarkers] = useState<Marker[]>([]);

  const onMarkerMove = (id: number | null, x: number, y: number) => {
    if (!id) {
      setMarkers([
        ...markers,
        {
          x,
          y,
          label: `${markers.length}`,
          isSecret: true,
        },
      ]);
      return;
    }
    setMarkers(markers.map((marker: Marker, markerId: number) => {
      if (markerId !== id) {
        return marker;
      }
      return {
        ...marker,
        x,
        y,
      };
    }));
  };

  useEffect(() => {
    setMarkers(location.markers ? [...location.markers] : []);
  }, [location]);

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
          alt={location.name}
          radius="md"
          src={location.mapImage}
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        />
      ) }

      <LocationMap
        backgroundImage={location.mapImage}
        content=""
        tokens={markers}
        onTokenMove={onMarkerMove}
      />

      {location.markers && (
        <div className="mb-6">
          <Locations title="Отметки" markers={location.markers} />
        </div>
      )}
    </CampaignItem>
  );
};

export default LocationDetails;
