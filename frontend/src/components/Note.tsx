// /frontend/src/components/Note.tsx
import React, { useContext } from 'react';
import { NotesContext } from '../context/NotesContext';

const Note: React.FC = () => {
  const { notes, addNote, updateNote } = useContext(NotesContext);

  const handleAddNote = () => {
    addNote();
  };

  return (
    <div>
      <button onClick={handleAddNote}>Add Note</button>
      {notes.map((note, index) => (
        <textarea
          key={index}
          value={note}
          onChange={(e) => updateNote(index, e.target.value)}
        />
      ))}
    </div>
  );
};

export default Note;

