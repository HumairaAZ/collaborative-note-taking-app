import React, { useEffect, useState } from 'react';
import { Button, TextField, Grid, CircularProgress, Fade, IconButton, Chip, Box } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { db } from '../firebase';
import firebase from 'firebase/app';

const Note: React.FC = () => {
  const [notes, setNotes] = useState<{ id: string, content: string, tags: string[] }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = db.collection('notes').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
      const notesData = snapshot.docs.map(doc => ({
        id: doc.id,
        content: doc.data().content || '',
        tags: doc.data().tags || [],
      }));
      setNotes(notesData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const addNote = () => {
    db.collection('notes').add({
      content: '',
      tags: [],
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  };

  const updateNote = (id: string, content: string, tags: string[]) => {
    db.collection('notes').doc(id).update({ content, tags });
  };

  const deleteNote = (id: string) => {
    db.collection('notes').doc(id).delete();
  };

  const addTag = (id: string, tag: string) => {
    const note = notes.find(note => note.id === id);
    if (note) {
      const updatedTags = [...note.tags, tag];
      updateNote(id, note.content, updatedTags);
    }
  };

  const removeTag = (id: string, tagToRemove: string) => {
    const note = notes.find(note => note.id === id);
    if (note) {
      const updatedTags = note.tags.filter(tag => tag !== tagToRemove);
      updateNote(id, note.content, updatedTags);
    }
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
                onChange={(e) => updateNote(note.id, e.target.value, note.tags)}
                aria-label="Note content"
                inputProps={{ style: { color: '#333' } }}
              />
              <IconButton aria-label="Delete note" onClick={() => deleteNote(note.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
            <Box display="flex" gap="8px" flexWrap="wrap" mt={1}>
              {note.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => removeTag(note.id, tag)}
                />
              ))}
              <TextField
                variant="outlined"
                size="small"
                placeholder="Add tag"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addTag(note.id, e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </Box>
          </Grid>
        </Fade>
      ))}
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={addNote} aria-label="Add note">
          Add Note
        </Button>
      </Grid>
    </Grid>
  );
};

export default Note;
