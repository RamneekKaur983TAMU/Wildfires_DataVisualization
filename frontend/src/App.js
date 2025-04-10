import React, { useState } from 'react';
import './App.css';
import EDA from './components/EDA/EDA.js';
import Predictions from './components/PREDICTION/Predictions.js';
import Decision from './components/decision';
import Header from './components/Header.js';
import Home from './components/home';
import About from './components/about';
import 'leaflet/dist/leaflet.css';

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
      case 'about':
        return <About setPage={setPage} />;
      case 'home':
      default:
        return <Home setPage={setPage} />;
    }
  };

  return (
    <div style={{ minHeight: '100%', overflowY: 'auto', backgroundColor: '#000', color: 'white' }}>
      <Header setPage={setPage} />
      {renderPage()}
    </div>
  );
}

export default App;
