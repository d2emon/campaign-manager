import { useNavigate, useParams } from 'react-router-dom';
import DetailPage from 'components/layout/DetailPage';
import CharacterDetails from 'components/modules/Character/CharacterDetails';
import { useGetCampaignQuery, useGetCampaignsQuery } from 'services/campaignApi';
import { useGetNPCQuery, useDeleteNPCMutation } from 'services/npcApi';

const CharacterDetailsPage = () => {
  const navigate = useNavigate();
  const { campaignId = '', characterId = '' } = useParams<{ campaignId: string; characterId: string }>();

  const getCampaign = useGetCampaignQuery(campaignId, {
    skip: !campaignId,
  });
  const getNPC = useGetNPCQuery({
    campaignId,
    characterId,
  }, {
    skip: !campaignId || !characterId,
  });
  const [deleteNPC] = useDeleteNPCMutation();

  const campaign = (campaignId && !getCampaign.isLoading)
    ? getCampaign.data
    : null;
  const character = (characterId && !getNPC.isLoading)
    ? getNPC.data
    : null;
  const isLoading = getCampaign.isLoading || getNPC.isLoading;
  const isNotFound = !campaign || !character;

  const handleDelete = async () => {
    if (isNotFound || isLoading) {
      return;
    }

    try {
      await deleteNPC({
        campaignId,
        id: characterId,
      });
      getCampaign.refetch();
      navigate('/');
    } catch (error) {
      console.error('Error deleting character:', error);
    }
  };

  return (
    <DetailPage
      backUrl={campaignId ? `/campaigns/${campaignId}` : '/dashboard'}
      breadcrumbs={{
        campaign: campaign,
        character: character,
      }}
      isLoading={isLoading}
      isNotFound={isNotFound}
      notFoundMessage="Персонаж не найден"
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
