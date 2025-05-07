import { useNavigate, useParams } from 'react-router-dom';
import DetailPage from 'components/layout/DetailPage';
import CharacterDetails from 'components/modules/Character/CharacterDetails';
import useCampaign from 'modules/campaign/hooks/useCampaign';
import { useGetNPCQuery, useDeleteNPCMutation } from 'services/npcApi';

const CharacterDetailsPage = () => {
  const navigate = useNavigate();
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
    skip: !campaignId || !characterId,
  });
  const [deleteNPC] = useDeleteNPCMutation();

  const character = (characterId && !getNPC.isLoading)
    ? getNPC.data
    : null;
  const isLoading = isLoadingCampaign || getNPC.isLoading;
  const isNotFound = !campaign || !character;

  const handleDelete = async () => {
    if (isNotFound || isLoading) {
      return;
    }

    try {
      await deleteNPC({
        campaignId,
        characterId,
      });
      reloadCampaign();
      goToCampaign();
    } catch (error) {
      console.error('Error deleting character:', error);
    }
  };

  return (
    <DetailPage
      breadcrumbs={{
        campaign: campaign,
        character: character,
      }}
      isLoading={isLoading}
      isNotFound={isNotFound}
      notFoundMessage="Персонаж не найден"
      onBack={goToCampaign}
    >
      {character && (
        <CharacterDetails
          character={character}
          onDelete={handleDelete}
          onEdit={() => navigate(`/campaigns/${campaignId}/characters/${characterId}/edit`)}
        />
      )}
    </DetailPage>
  );
};

export default CharacterDetailsPage;
