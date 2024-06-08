import React, { useEffect, useState } from 'react';
import { Button, TextField, Grid, CircularProgress, Fade, IconButton, Chip, Tooltip, makeStyles } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { db, auth } from '../firebase';
import firebase from 'firebase/app';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
  },
  flexContainer: {
    display: 'flex',
    gap: theme.spacing(1),
    flexWrap: 'wrap',
    marginTop: theme.spacing(1),
  },
  noteContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  editingIndicator: {
    marginTop: theme.spacing(1),
  },
  textField: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
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

  const updateNoteContent = (id: string, content: string) => {
    db.collection('notes').doc(id).update({ content });
  };

  const deleteNote = (id: string) => {
    db.collection('notes').doc(id).delete();
  };

  const addTag = (id: string, tag: string) => {
    db.collection('notes').doc(id).update({
      tags: firebase.firestore.FieldValue.arrayUnion(tag)
    });
  };

  const removeTag = (id: string, tagToRemove: string) => {
    db.collection('notes').doc(id).update({
      tags: firebase.firestore.FieldValue.arrayRemove(tagToRemove)
    });
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
            <div className={classes.noteContainer}>
              <TextField
                fullWidth
                variant="outlined"
                value={note.content}
                onChange={(e) => updateNoteContent(note.id, e.target.value)}
                aria-label="Note content"
                inputProps={{ style: { color: '#333' } }}
                onFocus={() => handleFocus(note.id)}
                onBlur={() => handleBlur(note.id)}
                className={classes.textField}
              />
              <IconButton aria-label="Delete note" onClick={() => deleteNote(note.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
            <div className={classes.flexContainer}>
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
            </div>
            {note.editingUsers.length > 0 && (
              <div className={classes.editingIndicator}>
                <Tooltip title="Currently editing">
                  <Chip label={`Editing by ${note.editingUsers.length} user(s)`} color="secondary" />
                </Tooltip>
              </div>
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
