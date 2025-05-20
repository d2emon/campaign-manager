import { BackgroundImage } from '@mantine/core';
import { useState } from 'react';
import MapMarker, { MapToken } from './MapMarker';

interface LocationMapProps {
  backgroundImage?: string;
  content: string;
  tokens?: MapToken[];
  width?: number;
  height?: number;
  onTokenMove?: (id: string | null, x: number, y: number) => void;
}

const LocationMap = ({
  backgroundImage = '',
  content,
  tokens,
  width = 400,
  height = 400,
  onTokenMove,
}: LocationMapProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (onTokenMove) {
      if (selected) {
        onTokenMove(selected, x, y);
      } else {
        onTokenMove(null, x, y);
      }
    }
    setSelected(null);
  };

  return (
    <div
      style={{
        width,
        height,
      }}
    >
      <BackgroundImage
        src={backgroundImage}
        radius="sm"
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleClick}
        >
          <g dangerouslySetInnerHTML={{ __html: content }} />

          {tokens && tokens.map((token) => (
            <MapMarker
              key={token.id}
              x={token.x}
              y={token.y}
              color={token.color}
              onSelect={setSelected}
            />
          ))}
        </svg>
      </BackgroundImage>
    </div>
  );
};

export default LocationMap;
