import React, { useEffect, useState } from 'react';
import { Button, TextField, Grid, CircularProgress, Fade, IconButton, Chip, Box, Tooltip, makeStyles } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { db, auth } from '../firebase';
import firebase from 'firebase/app';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
  },
}));

const Note: React.FC = () => {
  const [notes, setNotes] = useState<{ id: string, content: string, tags: string[], editingUsers: string[] }[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const classes = useStyles();

  useEffect(() => {
    const unsubscribe = db.collection('notes').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
      const notesData = snapshot.docs.map(doc => ({
        id: doc.id,
        content: doc.data().content || '',
        tags: doc.data().tags || [],
        editingUsers: doc.data().editingUsers || []
      }));
      setNotes(notesData);
      setLoading(false);
    });

    auth.onAuthStateChanged(user => {
      setCurrentUser(user ? user.uid : null);
    });

    return () => unsubscribe();
  }, []);

  const addNote = () => {
    db.collection('notes').add({
      content: '',
      tags: [],
      editingUsers: [],
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

  const handleFocus = (id: string) => {
    if (currentUser) {
      const noteRef = db.collection('notes').doc(id);
      noteRef.update({
        editingUsers: firebase.firestore.FieldValue.arrayUnion(currentUser)
      });
    }
  };

  const handleBlur = (id: string) => {
    if (currentUser) {
      const noteRef = db.collection('notes').doc(id);
      noteRef.update({
        editingUsers: firebase.firestore.FieldValue.arrayRemove(currentUser)
      });
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
                onFocus={() => handleFocus(note.id)}
                onBlur={() => handleBlur(note.id)}
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
                    addTag(note.id, (e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
            </Box>
            {note.editingUsers.length > 0 && (
              <Box mt={1}>
                <Tooltip title="Currently editing">
                  <Chip label={`Editing by ${note.editingUsers.length} user(s)`} color="secondary" />
                </Tooltip>
              </Box>
            )}
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
