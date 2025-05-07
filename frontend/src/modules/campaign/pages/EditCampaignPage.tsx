import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DetailPage from 'components/layout/DetailPage';
import CampaignForm from 'components/modules/Campaign/CampaignForm';
import { selectUser } from 'store/auth';
import { Campaign } from 'types/campaign';
import useCampaign from '../hooks/useCampaign';
import {
  CampaignCreateDTO,
  useCreateCampaignMutation,
  useUpdateCampaignMutation,
} from '../services/campaignApi';

const EditCampaignPage = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const {
    campaign,
    campaignId,
    isLoadingCampaign,
    reloadCampaign,
  } = useCampaign();

  const [createCampaign, { isLoading: isCreating }] = useCreateCampaignMutation();
  const [updateCampaign, { isLoading: isUpdating }] = useUpdateCampaignMutation();

  const isEditing = !!campaignId;
  const isLoading = isLoadingCampaign || isCreating || isUpdating;

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleSubmit = async (data: Partial<Campaign>) => {
    if (!user) return;

    try {
      if (isEditing) {
        await updateCampaign({ campaignId, data });
      } else {
        await createCampaign(data as CampaignCreateDTO);
      }
      reloadCampaign();
      handleBack();
    } catch (error) {
      console.error('Error saving campaign:', error);
    }
  };

  return (
    <DetailPage
      breadcrumbs={{
        campaign,
        isEdit: true,
      }}
      isLoading={isLoading}
      isNotFound={isEditing && !campaign}
      notFoundMessage="Кампания не найдена"
      title={campaignId ? 'Редактирование кампании' : 'Создание новой кампании'}
      onBack={handleBack}
    >
      <CampaignForm
        initialData={campaign}
        isEditing={isEditing}
        onSubmit={handleSubmit}
        onCancel={handleBack}
      />
    </DetailPage>
  );
};

export default EditCampaignPage; 