import { useNavigate } from 'react-router-dom';
import { Plus } from 'react-feather';
import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  SimpleGrid,
  Title,
} from '@mantine/core';
import { Note } from '../types/note';
import NoteCategory from './NoteCategory';

interface NoteListProps {
  notes?: Note[];
  campaignId?: string;
  className?: string;
  withAddButton?: boolean;
  withEditButton?: boolean;
  withDeleteButton?: boolean;
  onAdd?: () => void;
  onEdit?: (note: Note) => void;
  onDelete?: (note: Note) => void;
}

const NoteList = ({
  notes,
  campaignId = '',
  className,
  withAddButton = false,
  withEditButton = false,
  withDeleteButton = false,
  onAdd,
  onEdit,
  onDelete,
}: NoteListProps) => {
  const navigate = useNavigate();

  const handleNoteClick = (noteId: string) => {
    navigate(`/campaigns/${campaignId}/notes/${noteId}`);
  };

  const createEditHandler = (note: Note) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (onEdit) {
      console.log('handleEdit', note);
      onEdit(note);
    }
  };

  const createDeleteHandler = (note: Note) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (onDelete) {
      onDelete(note);
    }
  };

  return (
    <Box className={className}>
      <Group justify="space-between" mb="md">
        <Title order={2}>Заметки</Title>
        <Group align="center">
          {withAddButton && (
            <Button
              type="button"
              variant="primary"
              leftSection={<Plus size={16} />}
              onClick={onAdd}
            >
              Добавить
            </Button>
          )}
        </Group>
      </Group>

      {notes && notes.length > 0 ? (
        <SimpleGrid cols={2}>
          {notes.map((note) => (
            <Card
              key={note.slug}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleNoteClick(note.slug)}
            >
              <Group justify="space-between" mb="md">
                <Group align="center">
                  <Title order={3}>{note.title}</Title>
                  {!note.isPublic && (
                    <Badge color="red" size="sm">
                      Скрытый блок
                    </Badge>
                  )}
                </Group>
                <Group align="center">
                  { withEditButton && (
                    <Button
                      variant="default"
                      onClick={createEditHandler(note)}
                    >
                      Редактировать
                    </Button>
                  )}
                  { withDeleteButton && (
                    <Button
                      color="red"
                      onClick={createDeleteHandler(note)}
                    >
                      Удалить
                    </Button>
                  )}
                </Group>
              </Group>
              <Group>
                <NoteCategory category={note.category} />
                {note.tags?.map((tag) => (
                  <Badge
                    key={tag}
                    variant="primary"
                  >
                    {tag}
                  </Badge>
                ))}
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      ) : (
        <Box className="p-8 text-center">
          <p className="text-gray-600">
            Заметки не найдены
          </p>
        </Box>
      )}
    </Box>
  );
};

export default NoteList;
