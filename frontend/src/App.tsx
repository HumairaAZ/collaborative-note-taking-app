import React from 'react';
import { Container, AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import Note from './components/Note';
import NotesProvider from './context/NotesContext';

const App: React.FC = () => {
  return (
    <NotesProvider>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Collaborative Note-Taking App
            </Typography>
          </Toolbar>
        </AppBar>
        <Note />
      </Container>
    </NotesProvider>
  );
};

export default App;
