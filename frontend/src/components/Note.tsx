import React from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import { useNotes } from '../hooks/useNotes';

const Note: React.FC = () => {
  const { notes, addNote, updateNote } = useNotes();

  return (
    <Grid container spacing={2}>
      {notes.map((note, index) => (
        <Grid item xs={12} key={note.id}>
          <TextField
            fullWidth
            variant="outlined"
            value={note.content}
            onChange={(e) => updateNote(note.id, e.target.value)}
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={addNote}>
          Add Note
        </Button>
      </Grid>
    </Grid>
  );
};

export default Note;
