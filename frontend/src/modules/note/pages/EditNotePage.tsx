import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DetailPage from 'components/layout/DetailPage';
import useCampaign from 'modules/campaign/hooks/useCampaign';
import NoteForm from '../components/NoteForm';
import {
  NoteErrorResponse,
  useCreateNoteMutation,
  useGetNoteQuery,
  useUpdateNoteMutation,
} from '../services/noteApi';
import { Note } from '../types/note';

const EditNotePage = () => {
  const { noteId = '' } = useParams<{ noteId: string }>();
  const [ error, setError ] = useState<string | undefined>(undefined);
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

  const [createNote, {
    isSuccess: isCreateSuccess,
    error: createError,
  }] = useCreateNoteMutation();
  const [updateNote, {
    isSuccess: isUpdateSuccess,
    error: updateError,
  }] = useUpdateNoteMutation();

  const note = (noteId && !getNote.isLoading)
    ? getNote.data
    : null;
  const isEditing = !!noteId;
  const isLoading = isLoadingCampaign || getNote.isLoading;

  const handleSubmit = async (data: Partial<Note>) => {
    if (!campaignId) return;

    setError(undefined);

    try {
      const queryData = {
        category: data.category,
        content: data.content,
        isPublic: data.isPublic,
        slug: data.slug,
        tags: data.tags,
        title: data.title,
      };
      if (isEditing) {
        await updateNote({
          campaignId,
          noteId,
          data: queryData,
        });
      } else {
        await createNote({
          campaignId,
          data: queryData,
        });
      }
    } catch (error) {
      console.error('Error saving note:', error);
      setError(`${error}`);
    }
  };

  useEffect(() => {
    if (isCreateSuccess || isUpdateSuccess) {
      reloadCampaign();
      goToCampaign();
    }
  }, [
    goToCampaign,
    isCreateSuccess,
    isUpdateSuccess,
    reloadCampaign,
  ]);

  useEffect(() => {
    if (createError) {
      setError((createError as NoteErrorResponse)?.data?.error)  
    }
  }, [createError]);

  useEffect(() => {
    if (updateError) {
      setError((updateError as NoteErrorResponse)?.data?.error);  
    }
  }, [updateError]);
  
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
        error={error}
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
