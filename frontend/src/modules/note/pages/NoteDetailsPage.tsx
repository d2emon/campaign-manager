import { useNavigate, useParams } from 'react-router-dom';
import DetailPage from 'components/layout/DetailPage';
import useCampaign from 'modules/campaign/hooks/useCampaign';
import NoteDetails from '../components/NoteDetails';
import { useGetNoteQuery, useDeleteNoteMutation } from '../services/noteApi';

const NoteDetailsPage = () => {
  const navigate = useNavigate();
  const { noteId = '' } = useParams<{ campaignId: string; noteId: string }>();
  const {
    campaign,
    campaignId,
    goToCampaign,
    isLoadingCampaign,
    reloadCampaign,
  } = useCampaign();
  
  const getNote = useGetNoteQuery({ 
    campaignId: campaignId || '',
    noteId: noteId || ''
  });
  const [deleteNote] = useDeleteNoteMutation();

  const note = (noteId && !getNote.isLoading)
    ? getNote.data
    : null;
  const isNotFound = !campaign || !note;
  const isLoading = isLoadingCampaign || getNote.isLoading;

  const handleDelete = async () => {
    if (isNotFound || isLoading) {
      return;
    }
    
    if (!window.confirm('Вы уверены, что хотите удалить эту заметку?')) {
      return;
    }

    try {
      await deleteNote({ campaignId, noteId });
      reloadCampaign();
      goToCampaign();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <DetailPage
      breadcrumbs={{
        campaign,
        note,
      }}
      isLoading={isLoading}
      isNotFound={isNotFound}
      notFoundMessage="Заметка не найдена"
      onBack={goToCampaign}
    >     
      {note && (
        <NoteDetails
          note={note}
          isLoading={isLoading}
          onDelete={handleDelete}
          onEdit={() => navigate(`/campaigns/${campaignId}/notes/${noteId}/edit`)}
        />
      )}
    </DetailPage>
  );
};

export default NoteDetailsPage;
