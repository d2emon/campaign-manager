export interface MapToken {
  id: string;
  x: number;
  y: number;
  color: string;
}

interface MapMarkerProps {
  id?: string;
  x?: number;
  y?: number;
  color?: string;
  onSelect?: (id: string | null) => void;
}

const MapMarker = ({
  id,
  x = 0,
  y = 0,
  color = 'blue',
  onSelect,
}: MapMarkerProps) => {
  const handleSelect = () => {
    if (onSelect) {
      onSelect(id || null);
    }
  }

  return (
    <circle
      cx={x}
      cy={y}
      r="10"
      fill={color}
      onMouseDown={handleSelect}
      style={{ cursor: 'pointer' }}
    />
  );
};

export default MapMarker;
