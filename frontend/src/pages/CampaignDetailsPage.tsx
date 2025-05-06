import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from 'components/layout/Breadcrumbs';
import CampaignDetails from 'components/modules/Campaign/CampaignDetails';
import { useGetCampaignQuery, useDeleteCampaignMutation, useGetCampaignsQuery } from 'services/campaignApi';

const CampaignDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: campaign, isLoading } = useGetCampaignQuery(`${id}`);
  const { refetch: refetchCampaigns } = useGetCampaignsQuery();
  const [deleteCampaign] = useDeleteCampaignMutation();

  const handleDelete = async () => {
    if (id) {
      try {
        await deleteCampaign(id);
        refetchCampaigns();
        navigate('/');
      } catch (error) {
        console.error('Error deleting campaign:', error);
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

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Кампания не найдена</h1>
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
      <CampaignDetails
        campaign={campaign}
        isLoading={isLoading}
        onDelete={handleDelete}
        onEdit={() => navigate(`/campaigns/${id}/edit`)}
      />
    </div>
  );
};

export default CampaignDetailsPage; 