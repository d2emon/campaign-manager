import { useEffect } from 'react';
import { AlertCircle } from 'react-feather';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  Box,
  Button,
  Card,
  Group,
  NativeSelect,
  Switch,
  TagsInput,
  Textarea,
  TextInput,
} from '@mantine/core';
import * as yup from 'yup';
import { Note } from '../types/note';

interface NoteFormProps {
  error?: string;
  initialData?: Partial<Note> | null;
  isEditing?: boolean;
  isLoading?: boolean;
  onSubmit: (data: Partial<Note>) => Promise<void>;
  onCancel?: () => void;
}

const schema = yup.object({
  slug: yup
    .string()
    .required('Идентификатор обязателен'),
  title: yup
    .string()
    .required('Название обязательно'),
  category: yup
    .string()
    .required('Выберите категорию'),
  tags: yup
    .array()
    .of(yup.string().required())
    .optional()
    .default([]),
  isPublic: yup
    .boolean()
    .default(false),
  content: yup
    .string()
    .optional()
    .default(''),
});

interface NoteFormData {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  isPublic: boolean;
  content: string;
};

const NoteForm = ({
  error,
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
    setValue,
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
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="space-y-6">
          { error && (
            <Alert
              color="red"
              icon={<AlertCircle />}
              title="Ошибка"
            >
              {error}
            </Alert>
          )}
          <TextInput
            id="title"
            error={errors.title?.message}
            label="Название"
            {...register('title')}
          />

          <TextInput
            id="slug"
            error={errors.slug?.message}
            label="Идентификатор"
            {...register('slug')}
          />

          <NativeSelect
            id="category"
            error={errors.category?.message}
            label="Категория"
            data={[
              { value: '', label: 'Выберите категорию' },
              { value: 'plot', label: 'Сюжет' },
              { value: 'npc', label: 'Персонажи' },
              { value: 'location', label: 'Локации' },
              { value: 'lore', label: 'Лор' },
            ]}
            {...register('category')}
          />

          <TagsInput
            id="tags"
            error={errors.tags?.message}
            label="Теги"
            {...register('tags')}
            onChange={(value) => setValue('tags', value)}
          />

          <Switch
            id="isPublic"
            label="Доступна игрокам"
            {...register('isPublic')}
          />

          <Textarea
            id="content"
            error={errors.content?.message}
            label="Содержание"
            {...register('content')}
            rows={4}
          />

          <Group justify="flex-end">
            <Button
              type="button"
              onClick={onCancel}
              variant="secondary"
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
          </Group>
        </Card>
      </form>
    </Box>
  );
};

export default NoteForm;
