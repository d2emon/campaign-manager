import { useNavigate, useParams } from 'react-router-dom';
import DetailPage from 'components/layout/DetailPage';
import useCampaign from 'modules/campaign/hooks/useCampaign';
import {
  useDeleteLocationMutation,
  useGetLocationQuery,
} from 'modules/location/services/locationApi';
import LocationDetails from '../components/LocationDetails';

const LocationDetailsPage = () => {
  const navigate = useNavigate();
  const { locationId = '' } = useParams<{ locationId: string }>();
  const {
    campaign,
    campaignId,
    goToCampaign,
    isLoadingCampaign,
    reloadCampaign,
  } = useCampaign();
  
  const getLocation = useGetLocationQuery({
    campaignId,
    locationId,
  }, {
    skip: !campaignId || !locationId,
  });
  const [deleteLocation] = useDeleteLocationMutation();

  const location = (locationId && !getLocation.isLoading)
    ? getLocation.data
    : null;
  const isNotFound = !campaign || !location;
  const isLoading = isLoadingCampaign || getLocation.isLoading;

  const handleDelete = async () => {
    if (isNotFound || isLoading) {
      return;
    }

    if (!window.confirm('Вы уверены, что хотите удалить эту локацию?')) {
      return;
    }

    try {
      await deleteLocation({
        campaignId,
        locationId,
      });
      reloadCampaign();
      goToCampaign();
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  };

  return (
    <DetailPage
      breadcrumbs={{
        campaign: campaign,
        location: location,
      }}
      isLoading={isLoading}
      isNotFound={isNotFound}
      notFoundMessage="Локация не найдена"
      onBack={goToCampaign}
    >
      { location && (
        <LocationDetails
          location={location}
          onDelete={handleDelete}
          onEdit={() => navigate(`/campaigns/${campaignId}/locations/${locationId}/edit`)}
        />
      ) }
    </DetailPage>
  );
};

export default LocationDetailsPage;
