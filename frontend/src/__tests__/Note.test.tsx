import React from 'react';
import { render, screen } from '@testing-library/react';
import Note from '../components/Note';
import NotesProvider from '../context/NotesContext';

test('renders Add Note button', () => {
  render(
    <NotesProvider>
      <Note />
    </NotesProvider>
  );
  const buttonElement = screen.getByText(/Add Note/i);
  expect(buttonElement).toBeInTheDocument();
});
