import { useNavigate, useParams } from 'react-router-dom';
import DetailPage from 'components/layout/DetailPage';
import LocationDetails from 'components/modules/Location/LocationDetails';
import {
  useDeleteLocationMutation,
  useGetLocationQuery,
} from 'services/locationApi';
import { useGetCampaignQuery } from 'services/campaignApi';

const LocationDetailsPage = () => {
  const navigate = useNavigate();
  const { campaignId = '', locationId = '' } = useParams<{ campaignId: string; locationId: string }>();
  
  const getCampaign = useGetCampaignQuery(campaignId, {
    skip: !campaignId,
  });
  const getLocation = useGetLocationQuery({
    campaignId,
    locationId,
  }, {
    skip: !campaignId || !locationId,
  });
  const [deleteLocation] = useDeleteLocationMutation();

  const backUrl = campaignId ? `/campaigns/${campaignId}` : '/dashboard';
  const campaign = (campaignId && !getCampaign.isLoading)
    ? getCampaign.data
    : null;
  const location = (locationId && !getLocation.isLoading)
    ? getLocation.data
    : null;
  const isNotFound = !campaign || !location;
  const isLoading = getCampaign.isLoading || getLocation.isLoading;

  const handleBack = () => {
    navigate(backUrl);
  };

  const handleDelete = async () => {
    if (isNotFound || isLoading) {
      return;
    }

    try {
      await deleteLocation({
        campaignId,
        locationId,
      });
      getCampaign.refetch();
      navigate(backUrl);
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
      onBack={handleBack}
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
