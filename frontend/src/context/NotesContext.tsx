// /frontend/src/context/NotesContext.tsx
import React, { createContext, useState } from 'react';

interface NotesContextType {
  notes: string[];
  addNote: () => void;
  updateNote: (index: number, note: string) => void;
}

export const NotesContext = createContext<NotesContextType>({
  notes: [],
  addNote: () => {},
  updateNote: () => {}
});

const NotesProvider: React.FC = ({ children }) => {
  const [notes, setNotes] = useState<string[]>([]);

  const addNote = () => {
    setNotes([...notes, '']);
  };

  const updateNote = (index: number, note: string) => {
    const newNotes = [...notes];
    newNotes[index] = note;
    setNotes(newNotes);
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;

