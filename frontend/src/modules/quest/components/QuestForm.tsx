import { useEffect, useState } from 'react';
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
  NumberInput,
  Stack,
  Switch,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import * as yup from 'yup';
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
  rewards: yup
    .array()
    .of(yup.object({
      name: yup.string().required('Название награды обязательно'),
      quantity: yup.number().required('Количество награды обязательно'),
    }))
    .optional()
    .default([]),
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
  rewards: { name: string; quantity: number }[];
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
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QuestFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData || undefined,
  });
  const [rewards, setRewards] = useState<{ name: string; quantity: number }[]>([]);

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      setValue('rewards', []);
    } 
  }, [initialData, reset, setValue]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        if (value.title) {
          setValue('slug', slugify(value.title as string));
        }
      }
      if (name === 'rewards') {
        setRewards(value.rewards as { name: string; quantity: number }[] || []);
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
          <Stack className="space-y-4">
            <Group justify="space-between">
              <Title order={3}>Награды</Title>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => {
                  setValue('rewards', [...rewards, { name: '', quantity: 1 }]);
                }}
              >
                Добавить награду
              </Button>
            </Group>

            {rewards?.map((reward, index) => (
              <Group key={index} justify="space-between">
                <TextInput
                  className="flex-1"
                  label="Название"
                  error={errors.rewards?.[index]?.name?.message}
                  {...register(`rewards.${index}.name`)}
                />
                <NumberInput
                  className="w-24"
                  label="Количество"
                  error={errors.rewards?.[index]?.quantity?.message}
                  {...register(`rewards.${index}.quantity`)}
                  min={1}
                  max={1000000}
                  onChange={(value) => {
                    setValue(`rewards.${index}.quantity`, Number(value));
                  }}
                />
                <Button
                  type="button"
                  variant="subtle"
                  color="red"
                  onClick={() => {
                    const rewards = getValues('rewards');
                    setValue(
                      'rewards',
                      rewards.filter((_, i) => i !== index)
                    );
                  }}
                >
                  Удалить
                </Button>
              </Group>
            ))}
          </Stack>

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
