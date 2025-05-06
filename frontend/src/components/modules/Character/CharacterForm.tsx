import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from 'components/ui/Button';
import Field from 'components/ui/Field';
import Paper from 'components/ui/Paper';
import { Character } from 'types/character';

interface CharacterFormProps {
  initialData?: Partial<Character>;
  isEditing: boolean;
  isLoading: boolean;
  onSubmit: (data: Partial<Character>) => Promise<void>;
  onCancel: () => void;
}

const schema = yup.object({
  name: yup
    .string()
    .required('Имя персонажа обязательно')
    .min(2, 'Минимум 2 символа'),
  playerName: yup
    .string()
    .required('Имя игрока обязательно')
    .min(2, 'Минимум 2 символа'),
  race: yup
    .string()
    .required('Раса обязательна'),
  class: yup
    .string()
    .required('Класс обязателен'),
  level: yup
    .number()
    .min(1, 'Минимальный уровень: 1')
    .max(20, 'Максимальный уровень: 20')
    .required('Уровень обязателен'),
  description: yup.string().optional().default(''),
});

type CharacterFormData = {
  name: string;
  playerName: string;
  race: string;
  class: string;
  level: number;
  description: string;
};

const CharacterForm = ({ 
  initialData, 
  isEditing, 
  isLoading, 
  onSubmit, 
  onCancel 
}: CharacterFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CharacterFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (initialData) {
      setValue('name', initialData.name || '');
      setValue('playerName', initialData.playerName || '');
      setValue('race', initialData.race || '');
      setValue('class', initialData.class || '');
      setValue('level', initialData.level || 1);
      setValue('description', initialData.description || '');
    }
  }, [initialData, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Paper>
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? 'Редактирование персонажа' : 'Создание персонажа'}
        </h2>

        <Field
          id="name"
          error={errors.name}
          inputProps={register('name')}
          label="Имя персонажа"
        />

        <Field
          id="playerName"
          error={errors.playerName}
          inputProps={register('playerName')}
          label="Имя игрока"
        />

        <Field
          id="race"
          error={errors.race}
          inputProps={register('race')}
          label="Раса"
        />

        <Field
          id="class"
          error={errors.class}
          inputProps={register('class')}
          label="Класс"
        />

        <Field
          id="level"
          error={errors.level}
          inputProps={register('level', { valueAsNumber: true })}
          label="Уровень"
          type="number"
          min={1}
          max={20}
        />

        <Field
          id="description"
          error={errors.description}
          inputProps={register('description')}
          label="Описание"
          placeholder="Опишите вашего персонажа..."
          type="textarea"
        />
      </Paper>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Отмена
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isEditing ? 'Сохранить' : 'Создать'}
        </Button>
      </div>
    </form>
  );
};

export default CharacterForm; 