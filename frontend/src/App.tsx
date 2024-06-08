import React, { Suspense, lazy } from 'react';
import { Container, AppBar, Toolbar, Typography, CssBaseline, CircularProgress } from '@material-ui/core';
import { ThemeProvider, createTheme, makeStyles } from '@material-ui/core/styles';
import NotesProvider from './context/NotesContext';

const Note = lazy(() => import('./components/Note'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const useStyles = makeStyles({
  container: {
    padding: '20px',
    marginTop: '20px',
  },
});

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotesProvider>
        <Container className={classes.container}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">
                Collaborative Note-Taking App
              </Typography>
            </Toolbar>
          </AppBar>
          <Suspense fallback={<CircularProgress />}>
            <Note />
          </Suspense>
        </Container>
      </NotesProvider>
    </ThemeProvider>
  );
};

export default App;
