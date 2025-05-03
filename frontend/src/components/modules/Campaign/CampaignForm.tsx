import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from 'components/ui/Button';
import Field from 'components/ui/Field';
import CharacterList from './CharacterList';
import { Campaign } from 'services/campaignService';
import { Character } from 'types/character';

interface CampaignFormProps {
  initialData?: Partial<Campaign>;
  characters?: Character[];
  isEditing: boolean;
  isLoading: boolean;
  onSubmit: (data: Partial<Campaign>) => Promise<void>;
  onCancel: () => void;
}

const schema = yup.object({
  title: yup
    .string()
    .required('Название обязательно')
    .min(3, 'Минимум 3 символа'),
  description: yup
    .string()
    .required('Описание обязательно')
    .min(10, 'Минимум 10 символов'),
  gameSystem: yup
    .string()
    .required('Выберите игровую систему'),
  maxPlayers: yup
    .number()
    .min(1, 'Минимум 1 игрок')
    .max(10, 'Максимум 10 игроков')
    .required('Укажите максимальное количество игроков'),
});

type CampaignFormData = {
  title: string;
  description: string;
  gameSystem: string;
  maxPlayers: number;
};

const CampaignForm = ({ 
  initialData, 
  characters = [], 
  isEditing, 
  isLoading, 
  onSubmit, 
  onCancel 
}: CampaignFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CampaignFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (initialData) {
      console.log('initialData', initialData);
      setValue('title', initialData.title || '');
      setValue('description', initialData.description || '');
      setValue('gameSystem', initialData.gameSystem || '');
      setValue('maxPlayers', initialData.maxPlayers || 4);
    }
  }, [initialData, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Field
        id="title"
        error={errors.title}
        inputProps={register('title')}
        label="Название кампании"
      />

      <Field
        id="description"
        error={errors.description}
        inputProps={register('description')}
        label="Описание"
        placeholder="Опишите вашу кампанию..."
        type="textarea"
      />

      <div className="mb-6">
        <label
          htmlFor="gameSystem"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Игровая система
        </label>
        <select
          id="gameSystem"
          {...register('gameSystem')}
          className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        >
          <option value="">Выберите систему</option>
          <option value="dnd5e">Dungeons & Dragons 5e</option>
          <option value="pathfinder2e">Pathfinder 2e</option>
          <option value="call-of-cthulhu">Call of Cthulhu</option>
          <option value="warhammer">Warhammer Fantasy</option>
          <option value="other">Другая система</option>
        </select>
        {errors.gameSystem && (
          <div className="mt-2 text-red-600">
            {errors.gameSystem.message}
          </div>
        )}
      </div>

      <Field
        id="maxPlayers"
        error={errors.maxPlayers}
        inputProps={register('maxPlayers', { valueAsNumber: true })}
        label="Максимум игроков"
        type="number"
        min={1}
        max={20}
      />

      {isEditing && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Персонажи кампании</h2>
          <CharacterList characters={characters} />
        </div>
      )}

      <div className="flex justify-end space-x-4">
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
      </div>
    </form>
  );
};

export default CampaignForm; 