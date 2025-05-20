import { useEffect } from 'react';
import { AlertCircle, Upload } from 'react-feather';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  Button,
  Card,
  FileInput,
  Group,
  Image,
  Loader,
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
  isUploadingImage?: boolean;
  uploadImageError?: string;
  onSubmit: (values: Partial<Location>) => void;
  onCancel?: () => void;
  onUploadImage?: (value: File | null) => Promise<string>;
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
  mapImage: yup
    .string()
    .required('Укажите ссылку на изображение карты'),
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
  mapImage: string;
  tags: string[];
  isPublic: boolean;
};

const LocationForm = ({
  error,
  initialData,
  isEditing = false,
  isLoading = false,
  isUploadingImage = false,
  uploadImageError,
  onSubmit,
  onCancel,
  onUploadImage,
}: LocationFormProps) => {
  const {
    control,
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

  const mapImage = watch('mapImage');

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

  const handleUploadImage = async (value: File | null) => {
    if (onUploadImage) {
      const url = await onUploadImage(value);
      setValue('mapImage', url);
    }
  };

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


        { isUploadingImage ? (
          <Group justify="center">
            <Loader />
          </Group>
        ) : (
          <>
            {mapImage && (
              <Image
                alt="Предпросмотр карты"
                radius="md"
                src={mapImage}
                fallbackSrc="https://placehold.co/600x400?text=Placeholder"
              />
            )}

            <Controller
              name="mapImage"
              control={control}
              render={({ field, fieldState }) => (
                <TextInput
                  id="mapImage"
                  error={fieldState.error?.message}
                  label="Ссылка на изображение"
                  placeholder='https://placehold.co/600x400?text=Placeholder'
                  {...field}
                />
              )}
            />

            <FileInput
              id="mapImageFile"
              error={uploadImageError}
              label="Загрузить изображение"
              rightSection={<Upload />}
              accept="image/*"
              clearable
              onChange={handleUploadImage}
            />
          </>
        )}

        <Controller
          name="tags"
          control={control}
          render={({ field, fieldState }) => (
            <TagsInput
              id="tags"
              label="Теги"
              error={fieldState.error?.message}
              value={field.value || []}
              onChange={field.onChange}
            />    
          )}
        />

        <Controller
          name="isPublic"
          control={control}
          render={({ field, fieldState }) => (
            <Switch
              id="isPublic"
              label="Доступна игрокам"
              error={fieldState.error?.message}
              checked={field.value}
              onChange={(event) => field.onChange(event.currentTarget.checked)}
            />    
          )}
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
