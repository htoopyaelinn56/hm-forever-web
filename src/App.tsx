import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Home';
import Detail from './Detail';
import AppBar from './AppBar';
import { useFontLoader } from './hooks/useFontLoader';
import './App.css';

function AppContent() {
  const [, setScrolled] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();
  const fontLoaded = useFontLoader('JetBrains Mono', '400');

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const handleScroll = () => {
      setScrolled(content.scrollTop > 0);
    };
    content.addEventListener('scroll', handleScroll);
    return () => content.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith('/detail/')) {
      setSearchValue('');
    }
  }, [location.pathname]);

  // Show loading screen while font is loading
  if (!fontLoaded) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        fontFamily: 'system-ui, -apple-system, sans-serif' // Use system font for loading
      }}>
        <div style={{
          textAlign: 'center',
          color: '#666'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid #e0e0e0',
            borderTop: '3px solid #007bff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AppBar
        title="H&M Forever"
        searchValue={searchValue}
        onSearchChange={e => setSearchValue(e.target.value)}
      />
      <Routes>
        <Route path="/" element={<Home searchValue={searchValue} />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
