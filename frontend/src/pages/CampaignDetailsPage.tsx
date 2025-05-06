import { useNavigate, useParams } from 'react-router-dom';
import CharacterList from 'components/modules/Campaign/CharacterList';
import Paper from 'components/ui/Paper';
import { useGetCampaignQuery, useDeleteCampaignMutation, useGetCampaignsQuery } from 'services/campaignApi';

const CampaignDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: campaign, isLoading } = useGetCampaignQuery(`${id}`);
  const { refetch: refetchCampaigns } = useGetCampaignsQuery();
  const [deleteCampaign, { isLoading: isDeleting }] = useDeleteCampaignMutation();

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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Paper className="mb-6">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl font-bold text-gray-900">{campaign.title}</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate(`/campaigns/${id}/edit`)}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition"
              >
                Редактировать
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Удалить
              </button>
            </div>
          </div>

          <div className="mb-6">
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              {campaign.gameSystem}
            </span>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700">{campaign.description}</p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Информация о кампании</h2>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Максимум игроков</dt>
                <dd className="mt-1 text-sm text-gray-900">{campaign.maxPlayers}</dd>
              </div>
              {campaign.createdAt && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Создана</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(campaign.createdAt).toLocaleDateString()}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </Paper>

        <CharacterList characters={campaign.npcs} />
      </div>
    </div>
  );
};

export default CampaignDetailsPage; 