import { FC } from 'react';
import { Location } from 'types/location';

interface LocationDetailsProps {
  location: Location;
  isLoading?: boolean;
  onDelete: () => void;
  onEdit: () => void;
}

const LocationDetails: FC<LocationDetailsProps> = ({
  location,
  isLoading,
  onDelete,
  onEdit,
}) => {
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{location.name}</h1>
          <h2 className="text-xl font-semibold text-gray-800">{location.type}</h2>
          <div className="space-x-4">
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Редактировать
            </button>
            <button
              onClick={onDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Удалить
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Карта</h2>
            <p className="mt-2 text-gray-600">{location.mapImage}</p>
          </div>

          {location.markers && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Отметки</h2>
              <p className="mt-2 text-gray-600">{location.markers.map((marker, index) => (
                <div key={index}>
                  <p>{marker.label}</p>
                  <p>{marker.x}</p>
                  <p>{marker.y}</p>
                </div>
              ))}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;
