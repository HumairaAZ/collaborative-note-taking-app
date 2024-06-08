import React, { useEffect, useState } from 'react';
import { Button, TextField, Grid, CircularProgress, Fade, IconButton, makeStyles } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { db } from '../firebase';
import firebase from 'firebase/app';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
  },
}));

const Note: React.FC = () => {
  const [notes, setNotes] = useState<{ id: string, content: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    const unsubscribe = db.collection('notes').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
      const notesData = snapshot.docs.map(doc => ({
        id: doc.id,
        content: doc.data().content || ''
      }));
      setNotes(notesData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const addNote = () => {
    db.collection('notes').add({
      content: '',
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  };

  const updateNote = (id: string, content: string) => {
    db.collection('notes').doc(id).update({ content });
  };

  const deleteNote = (id: string) => {
    db.collection('notes').doc(id).delete();
  };

  return (
    <Grid container spacing={2}>
      {loading && <CircularProgress />}
      {notes.map((note) => (
        <Fade in={!loading} key={note.id}>
          <Grid item xs={12} sm={6} md={4}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TextField
                fullWidth
                variant="outlined"
                value={note.content}
                onChange={(e) => updateNote(note.id, e.target.value)}
                aria-label="Note content"
                inputProps={{ style: { color: '#333' } }}
              />
              <IconButton aria-label="Delete note" onClick={() => deleteNote(note.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </Grid>
        </Fade>
      ))}
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={addNote} className={classes.button} aria-label="Add note">
          Add Note
        </Button>
      </Grid>
    </Grid>
  );
};

export default Note;
