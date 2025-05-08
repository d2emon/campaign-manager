import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from 'components/ui/Button';
import Field from 'components/ui/Field';
import Paper from 'components/ui/Paper';
import { Note } from '../types/note';

interface NoteFormProps {
  initialData?: Partial<Note> | null;
  isEditing?: boolean;
  isLoading?: boolean;
  onSubmit: (data: Partial<Note>) => Promise<void>;
  onCancel?: () => void;
}

const schema = yup.object({
  title: yup
    .string()
    .required('Название обязательно'),
  content: yup
    .string()
    .required('Содержание обязательно'),
});

type NoteFormData = {
  title: string;
  content: string;
};

const NoteForm = ({
  initialData,
  isEditing = false,
  isLoading = false,
  onSubmit,
  onCancel,
}: NoteFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData || undefined,
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <Paper>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field
          id="title"
          error={errors.title}
          inputProps={register('title')}
          label="Название"
        />

        <Field
          id="content"
          error={errors.content}
          inputProps={register('content')}
          label="Содержание"
          type="textarea"
          rows={4}
        />

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Отмена
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            variant="primary"
          >
            {isLoading ? 'Сохранение...' : isEditing ? 'Сохранить' : 'Создать'}
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default NoteForm;
