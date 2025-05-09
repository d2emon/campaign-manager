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
  Textarea,
  TextInput,
} from '@mantine/core';
import * as yup from 'yup';
import Field from 'components/ui/Field';
import slugify from 'helpers/slugify';
import { Quest } from '../types/quest';

interface QuestFormProps {
  error?: string;
  initialData?: Partial<Quest> | null;
  isEditing?: boolean;
  isLoading?: boolean;
  onSubmit: (data: Partial<Quest>) => Promise<void>;
  onCancel?: () => void;
}

const schema = yup.object({
  slug: yup
    .string()
    .required('Идентификатор обязателен')
    .matches(/^[a-z0-9-]+$/, 'Идентификатор может содержать только латинские буквы, цифры и дефисы'),
  title: yup
    .string()
    .required('Название квеста обязательно')
    .min(2, 'Минимум 2 символа'),
  description: yup
    .string()
    .required('Описание квеста обязательно')
    .min(10, 'Минимум 10 символов'),
  reward: yup
    .string()
    .optional()
    .default(''),
  status: yup
    .string()
    .required('Статус обязателен')
    .oneOf(['active', 'completed', 'failed'] as const, 'Некорректный статус'),
  isPublic: yup
    .boolean()
    .default(false),
});

type QuestFormData = {
  slug: string;
  title: string;
  description: string;
  reward: string;
  status: 'active' | 'completed' | 'failed';
  isPublic: boolean;
};

const QuestForm = ({
  error,
  initialData,
  isEditing = false,
  isLoading = false,
  onSubmit,
  onCancel,
}: QuestFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QuestFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData || undefined,
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        if (value.title) {
          setValue('slug', slugify(value.title as string));
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [setValue, watch]);

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
            label="Название квеста"
            {...register('title')}
          />

          <TextInput
            id="slug"
            error={errors.slug?.message}
            label="Идентификатор"
            {...register('slug')}
          />

          <Textarea
            id="description"
            error={errors.description?.message}
            label="Описание"
            {...register('description')}
            rows={4}
          />

          <NativeSelect
            id="status"
            error={errors.status?.message}
            label="Статус"
            {...register('status')}
            data={[
              { value: '', label: 'Выберите статус' },
              { value: 'active', label: 'Активен' },
              { value: 'completed', label: 'Завершен' },
              { value: 'failed', label: 'Провален' },
            ]}
          />

          <Switch
            id="isPublic"
            label="Доступен игрокам"
            {...register('isPublic')}
          />

          <Field
            id="reward"
            error={errors.reward}
            inputProps={register('reward')}
            label="Награда"
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

export default QuestForm;
