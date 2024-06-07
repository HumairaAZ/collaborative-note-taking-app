import React from 'react';
import { Container, AppBar, Toolbar, Typography, CssBaseline } from '@material-ui/core';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Note from './components/Note';
import NotesProvider from './context/NotesContext';

const theme = createTheme({
  transitions: {
    duration: {
      enteringScreen: 500,
      leavingScreen: 500,
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
    </ThemeProvider>
  );
};

export default App;
