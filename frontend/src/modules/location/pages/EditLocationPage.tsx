import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DetailPage from 'components/layout/DetailPage';
import LocationForm from 'components/modules/Location/LocationForm';
import useCampaign from 'modules/campaign/hooks/useCampaign';
import {
  useCreateLocationMutation,
  useGetLocationQuery,
  useUpdateLocationMutation,
} from 'services/locationApi';
import { selectUser } from 'store/auth';
import { Location } from 'types/location';

const EditLocationPage = () => {
  const { locationId = '' } = useParams<{ locationId: string }>();
  const user = useSelector(selectUser);
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
    skip: !campaignId || !locationId
  });
  const [createLocation, { isLoading: isCreating }] = useCreateLocationMutation();
  const [updateLocation, { isLoading: isUpdating }] = useUpdateLocationMutation();

  const location = (locationId && !getLocation.isLoading)
    ? getLocation.data
    : null;
  const isEditing = !!locationId;
  const isLoading = isLoadingCampaign || getLocation.isLoading || isCreating || isUpdating;

  const handleSubmit = async (data: Partial<Location>) => {
    if (!user || !campaignId) return;

    try {
      if (isEditing) {
        await updateLocation({ campaignId, locationId, data });
      } else {
        await createLocation({ campaignId, data });
      }
      reloadCampaign();
      goToCampaign();
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
      isNotFound={isEditing && !location}
      notFoundMessage="Локация не найдена"
      title={locationId ? 'Редактирование локации' : 'Создание новой локации'}
      onBack={goToCampaign}
    >
      <LocationForm
        initialData={location}
        isEditing={isEditing}
        onSubmit={handleSubmit}
        onCancel={goToCampaign}
      />
    </DetailPage>
  );
};

export default EditLocationPage;
