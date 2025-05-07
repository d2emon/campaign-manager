import { useParams } from 'react-router-dom';
import DetailPage from 'components/layout/DetailPage';
import useCampaign from 'modules/campaign/hooks/useCampaign';
import { Character } from 'types/character';
import CharacterForm from '../components/CharacterForm';
import {
  useCreateNPCMutation,
  useGetNPCQuery,
  useUpdateNPCMutation,
} from '../services/npcApi';

const EditCharacterPage = () => {
  const { characterId = '' } = useParams<{ characterId: string }>();
  const {
    campaign,
    campaignId,
    goToCampaign,
    isLoadingCampaign,
    reloadCampaign,
  } = useCampaign();

  const getNPC = useGetNPCQuery({
    campaignId,
    characterId,
  }, {
    skip: !campaignId || !characterId
  });
  const [createNPC, { isLoading: isCreating }] = useCreateNPCMutation();
  const [updateNPC, { isLoading: isUpdating }] = useUpdateNPCMutation();

  const character = (characterId && !getNPC.isLoading)
    ? getNPC.data
    : null;
  const isEditing = !!characterId;
  const isLoading = isLoadingCampaign || getNPC.isLoading || isCreating || isUpdating;

  const handleSubmit = async (data: Partial<Character>) => {
    try {
      if (isEditing) {
        await updateNPC({ campaignId, id: characterId, data });
      } else {
        await createNPC({ campaignId, data });
      }
      reloadCampaign();
      goToCampaign();
    } catch (error) {
      console.error('Error saving character:', error);
    }
  };

  return (
    <DetailPage
      breadcrumbs={{
        campaign,
        character,
        isEdit: true,
      }}
      isLoading={isLoading}
      isNotFound={isEditing && !character}
      notFoundMessage="Персонаж не найден"
      title={characterId ? 'Редактирование персонажа' : 'Создание нового персонажа'}
      onBack={goToCampaign}
    >
      <CharacterForm
        initialData={character}
        isEditing={isEditing}
        onSubmit={handleSubmit}
        onCancel={goToCampaign}
      />
    </DetailPage>
  );
};

export default EditCharacterPage; 