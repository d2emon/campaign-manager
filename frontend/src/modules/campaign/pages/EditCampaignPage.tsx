import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DetailPage from 'components/layout/DetailPage';
import CampaignForm from 'components/modules/Campaign/CampaignForm';
import {
  CampaignCreateDTO,
  useCreateCampaignMutation,
  useGetCampaignQuery,
  useUpdateCampaignMutation,
} from 'services/campaignApi';
import { selectUser } from 'store/auth';
import { Campaign } from 'types/campaign';

const EditCampaignPage = () => {
  const navigate = useNavigate();
  const { campaignId } = useParams<{ campaignId: string }>();
  const user = useSelector(selectUser);

  const getCampaign = useGetCampaignQuery(campaignId || '', {
    skip: !campaignId
  });
  const [createCampaign, { isLoading: isCreating }] = useCreateCampaignMutation();
  const [updateCampaign, { isLoading: isUpdating }] = useUpdateCampaignMutation();

  const campaign = (campaignId && !getCampaign.isLoading)
    ? getCampaign.data
    : null;
  const isEditing = !!campaignId;
  const isLoading = getCampaign.isLoading || isCreating || isUpdating;

  useEffect(() => {
    if (campaignId) {
      getCampaign.refetch();
    }
  }, [campaignId, getCampaign]);

  const handleSubmit = async (data: Partial<Campaign>) => {
    if (!user) return;

    try {
      if (isEditing) {
        await updateCampaign({ campaignId, data });
      } else {
        await createCampaign(data as CampaignCreateDTO);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving campaign:', error);
    }
  };

  return (
    <DetailPage
      backUrl="/dashboard"
      breadcrumbs={{
        campaign: campaign,
      }}
      isLoading={isLoading}
      isNotFound={!campaign}
      notFoundMessage="Кампания не найдена"
      title={campaignId ? 'Редактирование кампании' : 'Создание новой кампании'}
    >
      {campaign && (
        <CampaignForm
          initialData={campaign}
          isEditing={isEditing}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/dashboard')}
        />
      )}
    </DetailPage>
  );
};

export default EditCampaignPage; 