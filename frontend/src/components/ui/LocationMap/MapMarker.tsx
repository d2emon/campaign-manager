import { MouseEvent } from 'react';

interface MapMarkerProps {
  id?: number;
  x?: number;
  y?: number;
  title?: string;
  color?: string;
  onSelect?: (id: number | null) => void;
  onMove?: (id: number | null) => void;
}

const MapMarker = ({
  id,
  x = 0,
  y = 0,
  color = 'blue',
  title,
  onSelect,
  onMove,
}: MapMarkerProps) => {
  const handleSelect = (e: MouseEvent<SVGSVGElement>) => {
    if (onSelect) {
      e.stopPropagation();
      onSelect(id || null);
    }
  }

  const handleMove = (e: MouseEvent<SVGSVGElement>) => {
    if (onMove) {
      e.stopPropagation();
      onMove(id || null);
    }
  }

  return (
    <g
      transform={`translate(${x}, ${y})`}
      onClick={handleSelect}
      onMouseDown={handleMove}
      style={{ cursor: 'pointer' }}
    >
      <circle
        r="10"
        fill={color}
      />
      { title && (<text y="-15" textAnchor="middle" fill="black">{title}</text>) }
    </g>
  );
};

export default MapMarker;
