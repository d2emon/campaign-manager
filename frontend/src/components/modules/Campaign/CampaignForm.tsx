import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from 'components/ui/Button';
import Field from 'components/ui/Field';
import Paper from 'components/ui/Paper';
import { useDeleteNPCMutation } from 'modules/character/services/npcApi';
import { useDeleteLocationMutation } from 'modules/location/services/locationApi';
import { Campaign } from 'types/campaign';
import { Character } from 'types/character';
import { Location } from 'types/location';
import CharacterList from './CharacterList';
import LocationList from '../Location/LocationList';

interface CampaignFormProps {
  initialData?: Partial<Campaign> | null;
  characters?: Character[];
  isEditing?: boolean;
  isLoading?: boolean;
  onSubmit: (data: Partial<Campaign>) => Promise<void>;
  onCancel?: () => void;
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
  const navigate = useNavigate();
  const [deleteNPC] = useDeleteNPCMutation();
  const [deleteLocation] = useDeleteLocationMutation();

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
      setValue('title', initialData.title || '');
      setValue('description', initialData.description || '');
      setValue('gameSystem', initialData.gameSystem || '');
      setValue('maxPlayers', initialData.maxPlayers || 4);
    }
  }, [initialData, setValue]);

  const handleEditCharacter = (character: Character) => {
    navigate(`/campaigns/${initialData?.id}/characters/${character.id}/edit`);
  };

  const handleDeleteCharacter = async (character: Character) => {
    if (window.confirm('Вы уверены, что хотите удалить этого персонажа?')) {
      await deleteNPC({ campaignId: initialData?.id || '', characterId: character.id });
      // Обновляем список персонажей после удаления
      const updatedCharacters = characters.filter(c => c.id !== character.id);
      onSubmit({ ...initialData, npcs: updatedCharacters });
    }
  };

  const handleEditLocation = (location: Location) => {
    navigate(`/campaigns/${initialData?.id}/locations/${location.id}/edit`);
  };

  const handleDeleteLocation = async (location: Location) => {
    if (window.confirm('Вы уверены, что хотите удалить эту локацию?')) {
      await deleteLocation({ campaignId: initialData?.id || '', locationId: location.id });
      // Обновляем список локаций после удаления
      const updatedLocations = initialData?.locations?.filter(l => l.id !== location.id) || [];
      onSubmit({ ...initialData, locations: updatedLocations });
    }
  };

  return (
    <Paper>
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

      {isEditing && (
        <div className="my-6 pt-6">
          <CharacterList
            characters={initialData?.npcs || []}
            withAddButton
            onAdd={() => {
              navigate(`/campaigns/${initialData?.id}/characters/new`);
            }}
            onEdit={handleEditCharacter}
            onDelete={handleDeleteCharacter}
          />
          <LocationList
            locations={initialData?.locations || []}
            campaignId={initialData?.id || ''}
            withAddButton
            onAdd={() => {
              navigate(`/campaigns/${initialData?.id}/locations/new`);
            }}
            onEdit={handleEditLocation}
            onDelete={handleDeleteLocation}
          />
        </div>
      )}
    </Paper>
  );
};

export default CampaignForm; 