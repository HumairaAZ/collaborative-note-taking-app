import React, { useEffect, useState } from 'react';
import { Button, TextField, Grid, CircularProgress } from '@material-ui/core';
import { db } from '../firebase';
import firebase from 'firebase/app';

const Note: React.FC = () => {
  const [notes, setNotes] = useState<{ id: string, content: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = db.collection('notes').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
      const notesData = snapshot.docs.map(doc => ({
        id: doc.id,
        content: doc.data().content || '' // Ensure content field is present
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
        <Button variant="contained" color="primary" onClick={addNote}>
          Add Note
        </Button>
      </Grid>
    </Grid>
  );
};

export default Note;
