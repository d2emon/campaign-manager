import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DetailPage from 'components/layout/DetailPage';
import CharacterForm from 'components/modules/Character/CharacterForm';
import {
  useGetCampaignQuery,
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
  const { campaignId = '', characterId = '' } = useParams<{ campaignId: string, characterId: string }>();
  const user = useSelector(selectUser);

  const getCampaign = useGetCampaignQuery(campaignId, {
    skip: !campaignId,
  });
  const getNPC = useGetNPCQuery({
    campaignId,
    characterId,
  }, {
    skip: !campaignId || !characterId
  });
  const [createNPC, { isLoading: isCreating }] = useCreateNPCMutation();
  const [updateNPC, { isLoading: isUpdating }] = useUpdateNPCMutation();

  const backUrl = campaignId ? `/campaigns/${campaignId}` : '/dashboard';
  const campaign = (campaignId && !getCampaign.isLoading)
    ? getCampaign.data
    : null;
  const character = (characterId && !getNPC.isLoading)
    ? getNPC.data
    : null;
  const isEditing = !!characterId;
  const isLoading = getCampaign.isLoading || getNPC.isLoading || isCreating || isUpdating;

  useEffect(() => {
    if (campaignId && characterId) {
      getNPC.refetch();
    }
  }, [campaignId, characterId, getNPC.refetch]);

  const handleBack = () => {
    navigate(backUrl);
  };

  const handleSubmit = async (data: Partial<Character>) => {
    if (!user) return;

    try {
      if (isEditing) {
        await updateNPC({ campaignId, id: characterId, data });
      } else {
        await createNPC({ campaignId, data });
      }
      if (campaignId) {
        getCampaign.refetch();
      }
      navigate(backUrl);
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
      isNotFound={!character}
      notFoundMessage="Персонаж не найден"
      title={characterId ? 'Редактирование персонажа' : 'Создание нового персонажа'}
      onBack={handleBack}
    >
      {character && (
        <CharacterForm
          initialData={character}
          isEditing={isEditing}
          onSubmit={handleSubmit}
          onCancel={handleBack}
        />
      )}
    </DetailPage>
  );
};

export default EditCharacterPage; 