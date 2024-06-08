import React, { Suspense, lazy } from 'react';
import { Container, AppBar, Toolbar, Typography, CssBaseline, CircularProgress } from '@material-ui/core';
import { ThemeProvider, createTheme, makeStyles } from '@material-ui/core/styles';
import NotesProvider from './context/NotesContext';


const Note = lazy(() => import('./components/Note'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a73e8',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#f4f4f4',
    },
    text: {
      primary: '#333',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
  },
  spacing: 8,
});

const useStyles = makeStyles({
  container: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(1),
  },
  toolbar: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
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
            <Toolbar className={classes.toolbar}>
              <Typography variant="h6">
                Collaborative Real-Time Note-Taking App
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
