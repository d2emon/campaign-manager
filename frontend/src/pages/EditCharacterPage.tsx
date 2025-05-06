import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CharacterForm from 'components/modules/Character/CharacterForm';
import Paper from 'components/ui/Paper';
import {
  useGetCampaignQuery,
  useGetCampaignsQuery,
} from 'services/campaignApi';
import {
  useCreateNPCMutation,
  useGetNPCQuery,
  useUpdateNPCMutation,
} from 'services/npcApi';
import { selectUser } from 'store/auth';
import { Character } from 'types/character';

const EditCharacterPage = () => {
  const navigate = useNavigate();
  const { id, characterId } = useParams<{ id: string, characterId: string }>();
  const user = useSelector(selectUser);
  const { refetch: refetchCampaigns } = useGetCampaignsQuery();
  const { refetch: refetchCampaign } = useGetCampaignQuery(`${id}`);
  const { data: npc, isLoading: isLoadingNPC, refetch: refetchNPC } = useGetNPCQuery({
    campaignId: id || '',
    id: characterId || '',
  });
  const [createNPC, { isLoading: isCreating }] = useCreateNPCMutation();
  const [updateNPC, { isLoading: isUpdating }] = useUpdateNPCMutation();
  const isLoading = isLoadingNPC || isCreating || isUpdating;

  useEffect(() => {
    refetchCampaign();
    refetchNPC();
  }, [id, characterId, refetchCampaign, refetchNPC]);

  const handleSubmit = async (data: Partial<Character>) => {
    if (!user) return;

    try {
      if (characterId) {
        await updateNPC({ campaignId: id || '', id: characterId, data });
      } else {
        await createNPC({ campaignId: id || '', data });
      }
      refetchCampaigns();
      refetchCampaign();
      navigate(`/campaigns/${id}`);
    } catch (error) {
      console.error('Error saving character:', error);
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
            {id ? 'Редактирование персонажа' : 'Создание нового персонажа'}
          </h1>
          <CharacterForm
            initialData={npc || undefined}
            isEditing={!!characterId}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/')}
          />
        </Paper>
      </div>
    </div>
  );
};

export default EditCharacterPage; 