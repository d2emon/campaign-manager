import { useNavigate } from 'react-router-dom';
import Button from 'components/ui/Button';
import Paper from 'components/ui/Paper';
import { Character } from 'types/character';
interface CharacterListProps {
  characters?: Character[];
  withAddButton?: boolean;
  onAdd?: () => void;
  onDelete?: (character: Character) => void;
  onEdit?: (character: Character) => void;
}

const CharacterList = ({ characters, withAddButton, onAdd, onDelete, onEdit }: CharacterListProps) => {
  const navigate = useNavigate();

  const showCharacter = (character: Character) => {
    navigate(`/campaigns/${character.campaign}/characters/${character.id}`);
  }

  return (
    <Paper>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Персонажи кампании</h2>
        {withAddButton && (
          <Button
            type="button"
            variant="primary"
            onClick={onAdd}
        >
            Добавить персонажа
          </Button>
        )}
      </div>

      { characters && characters.length > 0 ? (
        <div className="space-y-4">
          {characters.map((character) => (
            <Paper
              key={character.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => showCharacter(character)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {character.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Игрок: {character.playerName}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-gray-500">
                    Уровень {character.level}
                  </div>
                  {(onEdit || onDelete) && (
                    <div className="flex space-x-2">
                      {onEdit && (
                        <Button
                          variant="secondary"
                          onClick={() => onEdit(character)}
                        >
                          Редактировать
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="danger"
                          onClick={() => onDelete(character)}
                        >
                          Удалить
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  {character.race} {character.characterClass}
                </p>
                {character.description && (
                  <p className="mt-2 text-sm text-gray-700">
                    {character.description}
                  </p>
                )}
              </div>
            </Paper>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-4">
          В этой кампании пока нет персонажей
        </div>
      )}
    </Paper>
  );
};

export default CharacterList; 