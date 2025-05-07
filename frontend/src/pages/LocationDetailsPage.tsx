import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from 'components/layout/Breadcrumbs';
import LocationDetails from 'components/modules/Location/LocationDetails';
import {
  useDeleteLocationMutation,
  useGetLocationQuery,
} from 'services/locationApi';
import { useGetCampaignQuery } from 'services/campaignApi';

const LocationDetailsPage = () => {
  const navigate = useNavigate();
  const { campaignId = '', locationId = '' } = useParams<{ campaignId: string; locationId: string }>();
  
  const { data: location, isLoading } = useGetLocationQuery({
    campaignId,
    locationId,
  });
  const { data: campaign } = useGetCampaignQuery(campaignId || '');
  const [deleteLocation] = useDeleteLocationMutation();
  const { refetch: refetchCampaign } = useGetCampaignQuery(campaignId || '');

  const handleDelete = async () => {
    if (campaignId && locationId) {
      try {
        await deleteLocation({
          campaignId: campaignId,
          locationId: locationId,
        });
        refetchCampaign();
        navigate('/');
      } catch (error) {
        console.error('Error deleting location:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Локация не найдена</h1>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition"
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumbs
        campaign={campaign}
      />
      <LocationDetails
        location={location}
        isLoading={isLoading}
        onDelete={handleDelete}
        onEdit={() => navigate(`/campaigns/${campaignId}/locations/${locationId}/edit`)}
      />
    </div>
  );
};

export default LocationDetailsPage;
