import { useState } from 'react';

// Define the type for a note
type Note = {
  id: number;
  content: string;
};

// Define the type for the return value of the useNotes hook
type UseNotesReturn = {
  notes: Note[];
  addNote: () => void;
  updateNote: (id: number, content: string) => void;
  deleteNote: (id: number) => void;
};

// Create the useNotes hook
export const useNotes = (): UseNotesReturn => {
  const [notes, setNotes] = useState<Note[]>([]);

  // Function to add a new note
  const addNote = () => {
    const newNote: Note = { id: notes.length, content: '' };
    setNotes([...notes, newNote]);
  };

  // Function to update an existing note
  const updateNote = (id: number, content: string) => {
    setNotes(notes.map(note => (note.id === id ? { ...note, content } : note)));
  };

  // Function to delete a note
  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
  };
};

export {}; // Ensure the file is treated as a module
