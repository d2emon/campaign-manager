import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailPage from 'components/layout/DetailPage';
import useCampaign from 'modules/campaign/hooks/useCampaign';
import LocationForm from '../components/LocationForm';
import {
  LocationErrorResponse,
  useCreateLocationMutation,
  useGetLocationQuery,
  useUpdateLocationMutation,
  useUploadImageMutation,
} from '../services/locationApi';
import { Location } from '../types/location';

const EditLocationPage = () => {
  const { locationId = '' } = useParams<{ locationId: string }>();
  const [ error, setError ] = useState<string | undefined>(undefined);
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

  const [createLocation, {
    isSuccess: isCreateSuccess,
    error: createError,
  }] = useCreateLocationMutation();
  const [updateLocation, {
    isSuccess: isUpdateSuccess,
    error: updateError,
  }] = useUpdateLocationMutation();
  const [uploadImage, {
    isLoading: isUploadingImage,
  }] = useUploadImageMutation();

  const location = (locationId && !getLocation.isLoading)
    ? getLocation.data
    : null;
  const isEditing = !!locationId;
  const isLoading = isLoadingCampaign || getLocation.isLoading;

  const handleUploadImage = async (image: File | null) => {
    if (!location) {
      return '';
    }
    if (!image) {
      return '';
    }
    
    const data = new FormData();
    data.append('image', image);
    const result = await uploadImage({
      campaignId,
      locationId,
      data,
    });
    return result?.data?.url || '';
  };

  const handleSubmit = async (values: Partial<Location>) => {
    if (!campaignId) return;

    setError(undefined);

    try {
      const data = {
        isPublic: values.isPublic,
        mapImage: values.mapImage,
        markers: values.markers,
        name: values.name,
        slug: values.slug,
        type: values.type,
        tags: values.tags,
      };

      if (isEditing) {
        await updateLocation({ campaignId, locationId, data });
      } else {
        await createLocation({ campaignId, data });
      }
    } catch (error) {
      console.error('Error saving location:', error);
      setError(`${error}`);
    }
  };

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      reloadCampaign();
      goToCampaign();
    }
  }, [
    goToCampaign,
    isCreateSuccess,
    isUpdateSuccess,
    reloadCampaign,
  ]);

  useEffect(() => {
    if (createError) {
      setError((createError as LocationErrorResponse)?.data?.error)  
    }
  }, [createError]);

  useEffect(() => {
    if (updateError) {
      setError((updateError as LocationErrorResponse)?.data?.error);  
    }
  }, [updateError]);
  
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
        error={error}
        initialData={location}
        isEditing={isEditing}
        isLoading={isLoading}
        isUploadingImage={isUploadingImage}
        onSubmit={handleSubmit}
        onCancel={goToCampaign}
        onUploadImage={handleUploadImage}
      />
    </DetailPage>
  );
};

export default EditLocationPage;
