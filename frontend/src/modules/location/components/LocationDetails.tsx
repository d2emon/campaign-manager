import { useEffect, useState } from 'react';
import { Image } from '@mantine/core';
import CampaignItem from 'components/ui/CampaignItem';
import LocationMap from 'components/ui/LocationMap';
import { MapToken } from 'components/ui/LocationMap/MapMarker';
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
  const [tokens, setTokens] = useState<MapToken[]>([
    { id: '1', x: 10, y: 10, color: 'red' },
    { id: '2', x: 200, y: 10, color: 'blue' },
  ]);

  const mapContent = `
    <rect x="0" y="0" width="400" height="400" 
      fill="none" stroke="black" stroke-width="5px" stroke-opacity="0.5"/>
    <g fill-opacity="0.6" stroke="black" stroke-width="0.5px">
      <circle cx="200px" cy="200px" r="104px" fill="red"   transform="translate(  0,-52)" />
      <circle cx="200px" cy="200px" r="104px" fill="blue"  transform="translate( 60, 52)" />
      <circle cx="200px" cy="200px" r="104px" fill="green" transform="translate(-60, 52)" />
    </g>
  `;

  const onTokenMove = (id: string | null, x: number, y: number) => {
    console.log(id, x, y);
    if (!id) {
      setTokens([
        ...tokens,
        {
          id: `${tokens.length + 1}`,
          x,
          y,
          color: 'green',
        },
      ]);
      return;
    }
    setTokens(tokens.map((token: MapToken) => {
      if (token.id !== id) {
        return token;
      }
      return {
        ...token,
        x,
        y,
      };
    }));
  };

  useEffect(() => {
    setTokens(location.markers
      ? location.markers.map((marker, id) => ({
        id: `${id}`,
        x: marker.x,
        y: marker.y,
        color: marker.isSecret ? 'red' : 'blue',
      }))
      : [],
    );
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
        content={mapContent}
        tokens={tokens}
        onTokenMove={onTokenMove}
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
