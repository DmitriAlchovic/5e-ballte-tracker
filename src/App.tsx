import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import './App.css';
import AppRouter from './components/AppRouter/AppRouter';
import ErrorToast from './components/ErrorToast';

function App() {
  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={ErrorToast}>
        <AppRouter />
      </ErrorBoundary>
    </div>
  );
}

export default App;
