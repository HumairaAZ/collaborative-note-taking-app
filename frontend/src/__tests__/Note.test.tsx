import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Note from '../components/Note';
import NotesProvider from '../context/NotesContext';

test('adds a new note', () => {
  const { getByText, getAllByRole } = render(
    <NotesProvider>
      <Note />
    </NotesProvider>
  );

  fireEvent.click(getByText('Add Note'));

  const textareas = getAllByRole('textbox');
  expect(textareas).toHaveLength(1);
});

test('updates a note', () => {
  const { getByText, getAllByRole } = render(
    <NotesProvider>
      <Note />
    </NotesProvider>
  );

  fireEvent.click(getByText('Add Note'));

  const textarea = getAllByRole('textbox')[0];
  fireEvent.change(textarea, { target: { value: 'Updated note' } });
  expect(textarea.value).toBe('Updated note');
});
