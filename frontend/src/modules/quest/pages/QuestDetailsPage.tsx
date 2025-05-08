import { useNavigate, useParams } from 'react-router-dom';
import DetailPage from 'components/layout/DetailPage';
import useCampaign from 'modules/campaign/hooks/useCampaign';
import QuestDetails from '../components/QuestDetails';
import { useDeleteQuestMutation, useGetQuestQuery } from '../services/questApi';

const QuestDetailsPage = () => {
  const navigate = useNavigate();
  const { questId = '' } = useParams<{ questId: string }>();
  const {
    campaign,
    campaignId,
    goToCampaign,
    isLoadingCampaign,
    reloadCampaign,
  } = useCampaign();

  const getQuest = useGetQuestQuery({
    campaignId,
    questId,
  }, {
    skip: !campaignId || !questId,
  });
  const [deleteQuest] = useDeleteQuestMutation();

  const quest = (questId && !getQuest.isLoading)
    ? getQuest.data
    : null;
  const isNotFound = !campaign || !quest;
  const isLoading = isLoadingCampaign || getQuest.isLoading;

  const handleDelete = async () => {
    if (isNotFound || isLoading) {
      return;
    }

    if (!window.confirm('Вы уверены, что хотите удалить этот квест?')) {
      return;
    }

    try {
      await deleteQuest({ 
        campaignId,
        questId,
      });
      reloadCampaign();
      goToCampaign();
    } catch (error) {
      console.error('Error deleting quest:', error);
    }
  };

  return (
    <DetailPage
      breadcrumbs={{
        campaign,
        quest,
      }}
      isLoading={isLoading}
      isNotFound={isNotFound}
      notFoundMessage="Квест не найден"
      onBack={goToCampaign}
    >
      { quest && (
        <QuestDetails
          quest={quest}
          isLoading={isLoading}
          onDelete={handleDelete}
          onEdit={() => navigate(`/campaigns/${campaignId}/quests/${questId}/edit`)}
        />
      ) }
    </DetailPage>
  );
};

export default QuestDetailsPage;
