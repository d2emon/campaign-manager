import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import {
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
import CharacterList from 'modules/character/components/CharacterList';
import { useDeleteNPCMutation } from 'modules/character/services/npcApi';
import LocationList from 'modules/location/components/LocationList';
import { useDeleteLocationMutation } from 'modules/location/services/locationApi';
import { Character } from 'modules/character/types/character';
import { Location } from 'modules/location/types/location';
import NoteList from 'modules/note/components/NoteList';
import { useDeleteNoteMutation } from 'modules/note/services/noteApi';
import { Note } from 'modules/note/types/note';
import QuestList from 'modules/quest/components/QuestList';
import { useDeleteQuestMutation } from 'modules/quest/services/questApi';
import { Quest } from 'modules/quest/types/quest';
import { Campaign } from '../types/campaign';

interface CampaignFormProps {
  initialData?: Partial<Campaign> | null;
  characters?: Character[];
  isEditing?: boolean;
  isLoading?: boolean;
  onSubmit: (data: Partial<Campaign>) => Promise<void>;
  onCancel?: () => void;
}

const schema = yup.object({
  coverImage: yup
    .string()
    .url('Неверный URL')
    .optional()
    .default(''),
  description: yup
    .string()
    .required('Описание обязательно')
    .min(10, 'Минимум 10 символов'),
  gameSystem: yup
    .string()
    .required('Выберите игровую систему'),
  genre: yup
    .string()
    .required('Выберите жанр'),
  isPublic: yup
    .boolean()
    .default(true),
  title: yup
    .string()
    .required('Название обязательно')
    .min(3, 'Минимум 3 символа'),
});

type CampaignFormData = {
  coverImage: string;
  description: string;
  gameSystem: string;
  genre: string;
  isPublic: boolean;
  title: string;
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
  const [deleteQuest] = useDeleteQuestMutation();
  const [deleteNote] = useDeleteNoteMutation();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CampaignFormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

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

  const handleEditQuest = (quest: Quest) => {
    navigate(`/campaigns/${initialData?.id}/quests/${quest.id}/edit`);
  };

  const handleDeleteQuest = async (quest: Quest) => {
    if (window.confirm('Вы уверены, что хотите удалить этот квест?')) {
      await deleteQuest({ campaignId: initialData?.id || '', questId: quest.id });
      // Обновляем список квестов после удаления
      const updatedQuests = initialData?.quests?.filter(q => q.id !== quest.id) || [];
      onSubmit({ ...initialData, quests: updatedQuests });
    }
  };

  const handleEditNote = (note: Note) => {
    navigate(`/campaigns/${initialData?.id}/notes/${note.slug}/edit`);
  };

  const handleDeleteNote = async (note: Note) => {
    if (window.confirm('Вы уверены, что хотите удалить эту заметку?')) {
      await deleteNote({ campaignId: initialData?.id || '', noteId: note.slug });
      // Обновляем список заметок после удаления
      const updatedNotes = initialData?.notes?.filter(n => n.slug !== note.slug) || [];
      onSubmit({ ...initialData, notes: updatedNotes });
    }
  };
  
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="space-y-6">
          <TextInput
            id="title"
            error={errors.title?.message}
            label="Название кампании"
            {...register('title')}
          />

          <TextInput
            id="coverImage"
            error={errors.coverImage?.message}
            label="Изображение кампании"
            {...register('coverImage')}
          />

          <Textarea
            id="description"
            error={errors.description?.message}
            label="Описание"
            placeholder="Опишите вашу кампанию..."
            rows={4}
            {...register('description')}
          />

          <NativeSelect
            id="gameSystem"
            error={errors.gameSystem?.message}
            label="Игровая система"
            data={[
              { value: '', label: 'Выберите систему' },
              { value: 'dnd5e', label: 'Dungeons & Dragons 5e' },
              { value: 'pathfinder2e', label: 'Pathfinder 2e' },
              { value: 'call-of-cthulhu', label: 'Call of Cthulhu' },
              { value: 'warhammer', label: 'Warhammer Fantasy' },
              { value: 'other', label: 'Другая система' },
            ]}
            { ...register('gameSystem') }
          />

          <NativeSelect
            id="genre"
            error={errors.genre?.message}
            label="Жанр"
            data={[
              { value: '', label: 'Выберите жанр' },
              { value: 'fantasy', label: 'Фэнтези' },
              { value: 'sci-fi', label: 'Научная фантастика' },
              { value: 'horror', label: 'Ужасы' },
              { value: 'steampunk', label: 'Стимпанк' },
              { value: 'custom', label: 'Другой' },
            ]}
            { ...register('genre') }
          />

          <Switch
            id="isPublic"
            label="Публичная"
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

      {isEditing && (
        <Box className="my-6 pt-6">
          <LocationList
            className="my-6"
            locations={initialData?.locations || []}
            campaignId={initialData?.id || ''}
            withAddButton
            onAdd={() => {
              navigate(`/campaigns/${initialData?.id}/locations/new`);
            }}
            onEdit={handleEditLocation}
            onDelete={handleDeleteLocation}
          />

          <QuestList
            className="my-6"
            quests={initialData?.quests || []}
            campaignId={initialData?.id || ''}
            withAddButton
            onAdd={() => {
              navigate(`/campaigns/${initialData?.id}/quests/new`);
            }}
            onEdit={handleEditQuest}
            onDelete={handleDeleteQuest}
          />

          <NoteList
            className="my-6"
            notes={initialData?.notes || []}
            campaignId={initialData?.id || ''}
            withAddButton
            withEditButton
            withDeleteButton
            onAdd={() => {
              navigate(`/campaigns/${initialData?.id}/notes/new`);
            }}
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
          />

          <CharacterList
            className="my-6"
            characters={initialData?.npcs || []}
            withAddButton
            onAdd={() => {
              navigate(`/campaigns/${initialData?.id}/characters/new`);
            }}
            onEdit={handleEditCharacter}
            onDelete={handleDeleteCharacter}
          />
        </Box>
      )}
    </Box>
  );
};

export default CampaignForm; 