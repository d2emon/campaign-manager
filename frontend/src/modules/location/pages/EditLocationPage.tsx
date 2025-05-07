import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DetailPage from 'components/layout/DetailPage';
import LocationForm from 'components/modules/Location/LocationForm';
import { useGetCampaignQuery } from 'services/campaignApi';
import {
  useCreateLocationMutation,
  useGetLocationQuery,
  useUpdateLocationMutation,
} from 'services/locationApi';
import { selectUser } from 'store/auth';
import { Location } from 'types/location';

const EditLocationPage = () => {
  const navigate = useNavigate();
  const { locationId = '', campaignId = '' } = useParams<{ locationId: string; campaignId: string }>();
  const user = useSelector(selectUser);

  const getCampaign = useGetCampaignQuery(campaignId, {
    skip: !campaignId,
  })
  const getLocation = useGetLocationQuery({
    campaignId,
    locationId,
  }, {
    skip: !campaignId || !locationId
  });
  const [createLocation, { isLoading: isCreating }] = useCreateLocationMutation();
  const [updateLocation, { isLoading: isUpdating }] = useUpdateLocationMutation();

  const backUrl = campaignId ? `/campaigns/${campaignId}` : '/dashboard';
  const campaign = (campaignId && !getCampaign.isLoading)
    ? getCampaign.data
    : null;
  const location = (locationId && !getLocation.isLoading)
    ? getLocation.data
    : null;
  const isEditing = !!locationId;
  const isLoading = getCampaign.isLoading || getLocation.isLoading || isCreating || isUpdating;

  useEffect(() => {
    if (campaignId && locationId) {
      getLocation.refetch();
    }
  }, [campaignId, locationId, getLocation.refetch]);

  const handleBack = () => {
    navigate(backUrl);
  };

  const handleSubmit = async (data: Partial<Location>) => {
    if (!user || !campaignId) return;

    try {
      if (isEditing) {
        await updateLocation({ campaignId, locationId, data });
      } else {
        await createLocation({ campaignId, data });
      }
      if (campaignId) {
        getCampaign.refetch();
      }
      navigate(backUrl);
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  return (
    <DetailPage
      breadcrumbs={{
        campaign,
        location,
        isEdit: true,
      }}
      isLoading={isLoading}
      isNotFound={!location}
      notFoundMessage="Локация не найдена"
      title={locationId ? 'Редактирование локации' : 'Создание новой локации'}
      onBack={handleBack}
    >
      {location && (
        <LocationForm
          initialData={location}
          isEditing={isEditing}
          onSubmit={handleSubmit}
          onCancel={handleBack}
        />
      )}
    </DetailPage>
  );
};

export default EditLocationPage;
