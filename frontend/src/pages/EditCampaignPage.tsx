import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CampaignForm from 'components/modules/Campaign/CampaignForm';
import Paper from 'components/ui/Paper';
import {
  Campaign,
  CampaignCreateDTO,
  useCreateCampaignMutation,
  useGetCampaignQuery,
  useGetCampaignsQuery,
  useUpdateCampaignMutation,
} from 'services/campaignApi';
import { selectUser } from 'store/auth';

const CampaignFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const user = useSelector(selectUser);
  const { refetch: refetchCampaigns } = useGetCampaignsQuery();
  const { data: campaign, isLoading: isLoadingCampaign, refetch: refetchCampaign } = useGetCampaignQuery(`${id}`);
  const [createCampaign, { isLoading: isCreating }] = useCreateCampaignMutation();
  const [updateCampaign, { isLoading: isUpdating }] = useUpdateCampaignMutation();
  const isLoading = isLoadingCampaign || isCreating || isUpdating;

  useEffect(() => {
    refetchCampaign();
  }, [id, refetchCampaign]);

  const handleSubmit = async (data: Partial<Campaign>) => {
    if (!user) return;

    try {
      if (id) {
        await updateCampaign({ id, data });
      } else {
        await createCampaign(data as CampaignCreateDTO);
      }
      refetchCampaigns();
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving campaign:', error);
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
            {id ? 'Редактирование кампании' : 'Создание новой кампании'}
          </h1>
          <CampaignForm
            initialData={campaign || undefined}
            isEditing={!!id}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/')}
          />
        </Paper>
      </div>
    </div>
  );
};

export default CampaignFormPage; 