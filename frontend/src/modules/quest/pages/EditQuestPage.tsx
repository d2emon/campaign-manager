import { useParams } from 'react-router-dom';
import DetailPage from 'components/layout/DetailPage';
import useCampaign from 'modules/campaign/hooks/useCampaign';
import QuestForm from '../components/QuestForm';
import {
  useCreateQuestMutation,
  useGetQuestQuery,
  useUpdateQuestMutation,
} from '../services/questApi';
import { Quest } from '../types/quest';

const EditQuestPage = () => {
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
    skip: !campaignId || !questId
  });
  const [createQuest, { isLoading: isCreating }] = useCreateQuestMutation();
  const [updateQuest, { isLoading: isUpdating }] = useUpdateQuestMutation();

  const quest = (questId && !getQuest.isLoading)
    ? getQuest.data
    : null;
  const isEditing = !!questId;
  const isLoading = isLoadingCampaign || getQuest.isLoading || isCreating || isUpdating;

  const handleSubmit = async (data: Partial<Quest>) => {
    if (!campaignId) return;

    try {
      if (isEditing) {
        await updateQuest({ campaignId, questId, data });
      } else {
        await createQuest({ campaignId, data });
      }
      reloadCampaign();
      goToCampaign();
    } catch (error) {
      console.error('Error saving quest:', error);
    }
  };

  return (
    <DetailPage
      breadcrumbs={{
        campaign,
        quest,
        isEdit: true,
      }}
      isLoading={isLoading}
      isNotFound={isEditing && !quest}
      notFoundMessage="Квест не найден"
      title={questId ? 'Редактирование квеста' : 'Создание нового квеста'}
      onBack={goToCampaign}
    >
      <QuestForm
        initialData={quest}
        isEditing={isEditing}
        onSubmit={handleSubmit}
        onCancel={goToCampaign}
      />
    </DetailPage>
  );
};

export default EditQuestPage;
