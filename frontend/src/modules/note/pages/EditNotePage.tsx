import { useParams } from 'react-router-dom';
import DetailPage from 'components/layout/DetailPage';
import useCampaign from 'modules/campaign/hooks/useCampaign';
import NoteForm from '../components/NoteForm';
import {
  useCreateNoteMutation,
  useGetNoteQuery,
  useUpdateNoteMutation,
} from '../services/noteApi';
import { Note } from '../types/note';

const EditNotePage = () => {
  const { noteId = '' } = useParams<{ noteId: string }>();
  const {
    campaign,
    campaignId,
    goToCampaign,
    isLoadingCampaign,
    reloadCampaign,
  } = useCampaign();

  const getNote = useGetNoteQuery({
    campaignId,
    noteId,
  }, {
    skip: !campaignId || !noteId,
  });

  const [createNote, { isLoading: isCreating }] = useCreateNoteMutation();
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();

  const note = (noteId && !getNote.isLoading)
    ? getNote.data
    : null;
  const isEditing = !!noteId;
  const isLoading = isLoadingCampaign || getNote.isLoading || isCreating || isUpdating;

  const handleSubmit = async (data: Partial<Note>) => {
    if (!campaignId) return;

    try {
      if (isEditing) {
        await updateNote({
          campaignId,
          noteId,
          data,
        });
      } else {
        await createNote({
          campaignId,
          data,
        });
      }
      reloadCampaign();
      goToCampaign();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  return (
    <DetailPage
      breadcrumbs={{
        campaign,
        note,
        isEdit: true,
      }}
      isLoading={isLoading}
      isNotFound={isEditing && !note}
      notFoundMessage="Заметка не найдена"
      title={noteId ? 'Редактирование заметки' : 'Создание новой заметки'}
      onBack={goToCampaign}
    >
      <NoteForm
        initialData={note}
        isEditing={isEditing}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        onCancel={goToCampaign}
      />
    </DetailPage>
  );
};

export default EditNotePage;
