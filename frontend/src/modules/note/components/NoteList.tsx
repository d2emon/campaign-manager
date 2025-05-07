import Paper from 'components/ui/Paper';
import { Note } from '../types/note';

interface NoteListProps {
  className?: string;
  notes?: Note[];
  onNoteSelect?: (noteId: string) => void;
  selectedNoteId?: string;
}

const NoteList = ({ notes, className, onNoteSelect, selectedNoteId }: NoteListProps) => {
  const handleNoteSelect = (noteId: string) => {
    if (onNoteSelect) {
      onNoteSelect(noteId);
    }
  };

  return (
    <Paper className={className}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Заметки</h2>
      </div>

      {notes && notes.length > 0 ? (
        <div className="flex items-center space-x-2">
          {notes.map((note) => (
            <Paper
              key={note.id}
              // selected={selectedNoteId === note.id} 
              onClick={() => handleNoteSelect(note.id)}
              title={note.title}
            />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          <p className="text-gray-600">
            Заметки не найдены
          </p>
        </div>
      )}
    </Paper>
  );
};

export default NoteList;
