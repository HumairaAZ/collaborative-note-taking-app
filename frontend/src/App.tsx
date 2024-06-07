// /frontend/src/App.tsx
import React from 'react';
import NotesProvider from './context/NotesContext';
import Note from './components/Note';

const App: React.FC = () => {
  return (
    <NotesProvider>
      <div className="App">
        <h1>Collaborative Note-Taking App</h1>
        <Note />
      </div>
    </NotesProvider>
  );
};

export default App;

