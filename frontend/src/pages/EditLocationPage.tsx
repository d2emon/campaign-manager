import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import LocationForm from 'components/modules/Location/LocationForm';
import Paper from 'components/ui/Paper';
import { useGetCampaignQuery, useGetCampaignsQuery } from 'services/campaignApi';
import {
  useCreateLocationMutation,
  useGetLocationQuery,
  useUpdateLocationMutation,
} from 'services/locationApi';
import { selectUser } from 'store/auth';
import { Location } from 'types/location';

const EditLocationPage = () => {
  const navigate = useNavigate();
  const { locationId='', campaignId='' } = useParams<{ locationId: string; campaignId: string }>();
  const user = useSelector(selectUser);
  const { refetch: refetchCampaigns } = useGetCampaignsQuery();
  const { refetch: refetchCampaign } = useGetCampaignQuery(`${campaignId}`, {
    skip: !campaignId,
  })
  const { data: location, isLoading: isLoadingLocation, refetch: refetchLocation } = useGetLocationQuery({
    campaignId,
    locationId,
  }, {
    skip: !campaignId || !locationId
  });
  const [createLocation, { isLoading: isCreating }] = useCreateLocationMutation();
  const [updateLocation, { isLoading: isUpdating }] = useUpdateLocationMutation();
  const isLoading = isLoadingLocation || isCreating || isUpdating;

  useEffect(() => {
    if (campaignId && locationId) {
      refetchLocation();
    }
  }, [campaignId, locationId, refetchLocation]);

  const handleSubmit = async (data: Partial<Location>) => {
    if (!user || !campaignId) return;

    try {
      if (locationId) {
        await updateLocation({ campaignId, locationId, data });
      } else {
        await createLocation({ campaignId, data });
      }
      refetchCampaigns();
      if (campaignId) {
        refetchCampaign();
      }
      navigate(`/campaigns/${campaignId}`);
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Paper>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {locationId ? 'Редактирование локации' : 'Создание новой локации'}
          </h1>
          <LocationForm
            initialData={location}
            isEditing={!!locationId}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            onCancel={() => navigate(`/campaigns/${campaignId}`)}
          />
        </Paper>
      </div>
    </div>
  );
};

export default EditLocationPage;
