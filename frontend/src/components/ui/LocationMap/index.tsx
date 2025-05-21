import { useEffect, useMemo, useRef, useState } from 'react';
import { BackgroundImage } from '@mantine/core';
import { Marker } from 'modules/location/types/location';
import MapMarker from './MapMarker';

interface LocationMapProps {
  backgroundImage?: string;
  content: string;
  tokens?: Marker[];
  width?: number;
  height?: number;
  onTokenMove?: (id: number | null, x: number, y: number) => void;
}

const LocationMap = ({
  backgroundImage = '',
  content,
  tokens = [],
  width = 400,
  height = 400,
  onTokenMove,
}: LocationMapProps) => {
  const popupRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const selectedToken = useMemo(() => {
    if (selected) {
      return tokens[selected] || null;
    } else {
      return null;
    }
  }, [selected, tokens]);
  const popupX = useMemo(() => {
    if (!selectedToken) {
      return 0;
    }

    const rect = svgRef.current?.getBoundingClientRect();
    const clientLeft = rect?.left || 0;

    return selectedToken.x + clientLeft + 10;
  }, [selectedToken, svgRef])
  const popupY = useMemo(() => {
    if (!selectedToken) {
      return 0;
    }

    const rect = svgRef.current?.getBoundingClientRect();
    const clientTop = rect?.top || 0;

    return selectedToken.y + clientTop + 5;
  }, [selectedToken, svgRef])

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (onTokenMove) {
      onTokenMove(selected || null, x, y);
    }
  };

  const handleClickOutside: EventListener = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      setSelected(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
      }}
    >
      <BackgroundImage
        src={backgroundImage}
        radius="sm"
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleClick}
        >
          <g dangerouslySetInnerHTML={{ __html: content }} />

          {tokens && tokens.map((token, tokenId) => (
            <MapMarker
              key={tokenId}
              id={tokenId}
              x={token.x}
              y={token.y}
              color={token.isSecret ? 'red' : 'blue'}
              title={token.label}
              onSelect={setSelected}
              onMove={setSelected}
            />
          ))}
        </svg>
      </BackgroundImage>

      {selectedToken && (
        <div
          ref={popupRef}
          style={{
            position: 'fixed',
            left: popupX,
            top: popupY,
            backgroundColor: 'white',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
          }}
        >
          <p>{selectedToken.label}</p>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
