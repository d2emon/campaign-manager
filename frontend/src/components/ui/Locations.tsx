import { Marker } from 'modules/location/types/location';

interface LocationsProps {
  title?: string;
  markers?: Marker[];
}

const Locations = ({ title, markers }: LocationsProps) => {
  return (
    <div>
      { title && <h2 className="text-xl font-semibold text-gray-800">{title}</h2> }
      <div className="mt-2 text-gray-600">
        {markers?.map((marker, index) => (
          <div key={index}>
            <p>{marker.label}</p>
            <p>{marker.x}</p>
            <p>{marker.y}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;

