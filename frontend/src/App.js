import React, { useState } from 'react';
import './App.css';
import EDA from './components/eda';
import Predictions from './components/predictions';
import Decision from './components/decision';
import Header from './components/header';
import Home from './components/home';

function App() {
  const [page, setPage] = useState('home');

  const renderPage = () => {
    switch (page) {
      case 'eda':
        return <EDA setPage={setPage} />;
      case 'predictions':
        return <Predictions setPage={setPage} />;
      case 'decision':
        return <Decision setPage={setPage} />;
      case 'home':
      default:
        return <Home setPage={setPage} />;
    }
  };

  return (
    <>
      <Header setPage={setPage} />
      {renderPage()}
    </>
  );
}

export default App;
