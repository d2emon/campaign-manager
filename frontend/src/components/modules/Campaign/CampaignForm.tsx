import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from 'components/ui/Button';
import Field from 'components/ui/Field';
import CharacterList from './CharacterList';
import CharacterForm from './CharacterForm';
import { Campaign } from 'services/campaignService';
import { Character } from 'types/character';
import { createCharacter, updateCharacter, deleteCharacter } from 'services/characterService';

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
  const [isCharacterFormOpen, setIsCharacterFormOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isCharacterLoading, setIsCharacterLoading] = useState(false);

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
    setSelectedCharacter(character);
    setIsCharacterFormOpen(true);
  };

  const handleDeleteCharacter = async (character: Character) => {
    if (window.confirm('Вы уверены, что хотите удалить этого персонажа?')) {
      try {
        setIsCharacterLoading(true);
        await deleteCharacter(character.id);
        // Обновляем список персонажей после удаления
        const updatedCharacters = characters.filter(c => c.id !== character.id);
        onSubmit({ ...initialData, characters: updatedCharacters });
      } catch (error) {
        console.error('Ошибка при удалении персонажа:', error);
      } finally {
        setIsCharacterLoading(false);
      }
    }
  };

  const handleCharacterSubmit = async (data: Partial<Character>) => {
    try {
      setIsCharacterLoading(true);
      let updatedCharacter: Character;
      
      if (selectedCharacter) {
        updatedCharacter = await updateCharacter(selectedCharacter.id, data);
      } else {
        updatedCharacter = await createCharacter({
          ...data,
          campaignId: initialData?.id || '',
        } as any);
      }

      // Обновляем список персонажей
      const updatedCharacters = selectedCharacter
        ? characters.map(c => c.id === selectedCharacter.id ? updatedCharacter : c)
        : [...characters, updatedCharacter];

      onSubmit({ ...initialData, characters: updatedCharacters });
      setIsCharacterFormOpen(false);
      setSelectedCharacter(null);
    } catch (error) {
      console.error('Ошибка при сохранении персонажа:', error);
    } finally {
      setIsCharacterLoading(false);
    }
  };

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

      {isCharacterFormOpen && (
        <CharacterForm
          initialData={selectedCharacter || undefined}
          isEditing={!!selectedCharacter}
          isLoading={isCharacterLoading}
          onSubmit={handleCharacterSubmit}
          onCancel={() => {
            setIsCharacterFormOpen(false);
            setSelectedCharacter(null);
          }}
        />
      )}

      {isEditing && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Персонажи кампании</h2>
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                setSelectedCharacter(null);
                setIsCharacterFormOpen(true);
              }}
            >
              Добавить персонажа
            </Button>
          </div>
          
          <CharacterList
            characters={characters}
            onEdit={handleEditCharacter}
            onDelete={handleDeleteCharacter}
          />
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