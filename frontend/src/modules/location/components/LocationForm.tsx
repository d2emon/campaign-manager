import { useEffect } from 'react';
import { AlertCircle } from 'react-feather';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  Button,
  Card,
  Group,
  NativeSelect,
  Switch,
  TagsInput,
  TextInput,
} from '@mantine/core';
import * as yup from 'yup';
import slugify from 'helpers/slugify';
import { Location } from '../types/location';

interface LocationFormProps {
  error?: string;
  initialData?: Location | null;
  isEditing?: boolean;
  isLoading?: boolean;
  onSubmit: (data: Partial<Location>) => void;
  onCancel?: () => void;
}

const schema = yup.object({
  slug: yup
    .string()
    .required('Идентификатор обязателен')
    .matches(/^[a-z0-9-]+$/, 'Идентификатор может содержать только латинские буквы, цифры и дефисы'),
  name: yup
    .string()
    .required('Название обязательно'),
  type: yup
    .string()
    .required('Выберите тип локации'),
  tags: yup
    .array()
    .of(yup.string().required())
    .optional()
    .default([]),
  isPublic: yup
    .boolean()
    .default(false),
});

interface LocationFormData {
  slug: string;
  name: string;
  type: string;
  tags: string[];
  isPublic: boolean;
};

const LocationForm = ({
  error,
  initialData,
  isEditing = false,
  isLoading = false,
  onSubmit,
  onCancel
}: LocationFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LocationFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData || undefined
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      setValue('tags', []);
    }
  }, [initialData, reset, setValue]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'name') {
        if (value.name) {
          setValue('slug', slugify(value.name as string));
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [setValue, watch]);

  return (
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
        ) }

        <TextInput
          id="name"
          error={errors.name?.message}
          label="Название"
          { ...register('name') }
        />

        <TextInput
          id="slug"
          error={errors.slug?.message}
          label="Идентификатор"
          {...register('slug')}
        />

        <NativeSelect
          id="type"
          error={errors.type?.message}
          label="Тип локации"
          {...register('type')}
          data={[
            { value: '', label: 'Выберите тип локации' },
            { value: 'city', label: 'Город' },
            { value: 'dungeon', label: 'Подземелье' },
            { value: 'forest', label: 'Лес' },
            { value: 'tavern', label: 'Таверна' },
          ]}
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
  );
};

export default LocationForm;
