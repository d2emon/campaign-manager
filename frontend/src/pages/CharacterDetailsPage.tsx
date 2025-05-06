import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from 'components/layout/Breadcrumbs';
import CharacterDetails from 'components/modules/Character/CharacterDetails';
import { useGetCampaignQuery, useGetCampaignsQuery } from 'services/campaignApi';
import { useGetNPCQuery, useDeleteNPCMutation } from 'services/npcApi';

const CharacterDetailsPage = () => {
  const navigate = useNavigate();
  const { id, characterId } = useParams<{ id: string; characterId: string }>();
  const { data: character, isLoading } = useGetNPCQuery({
    campaignId: id || '',
    id: characterId || '',
  });
  const { data: campaign } = useGetCampaignQuery(id || '');
  const [deleteNPC] = useDeleteNPCMutation();
  const { refetch: refetchCampaign } = useGetCampaignQuery(id || '');
  const { refetch: refetchCampaigns } = useGetCampaignsQuery();

  const handleDelete = async () => {
    if (id) {
      try {
        await deleteNPC({
          campaignId: id || '',
          id: characterId || '',
        });
        refetchCampaign();
        refetchCampaigns()
        navigate('/');
      } catch (error) {
        console.error('Error deleting character:', error);
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

  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Персонаж не найден</h1>
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
        character={character}
      />
      <CharacterDetails
        character={character}
        isLoading={isLoading}
        onDelete={handleDelete}
        onEdit={() => navigate(`/characters/${id}/edit`)}
      />
    </div>
  );
};

export default CharacterDetailsPage;
