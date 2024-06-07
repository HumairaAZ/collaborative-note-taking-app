import React, { useState } from 'react';
import { Button, TextField, Grid, Snackbar, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useNotes } from '../hooks/useNotes';

const Note: React.FC = () => {
  const { notes, addNote, updateNote } = useNotes();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddNote = () => {
    setLoading(true);
    addNote();
    setLoading(false);
    setMessage('Note added successfully!');
  };

  return (
    <Grid container spacing={2}>
      {loading && <CircularProgress />}
      {notes.map((note) => (
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
        <Button variant="contained" color="primary" onClick={handleAddNote}>
          Add Note
        </Button>
      </Grid>
      <Snackbar open={Boolean(message)} autoHideDuration={6000} onClose={() => setMessage('')}>
        <Alert onClose={() => setMessage('')} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Note;
