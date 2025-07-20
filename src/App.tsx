import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Home';
import Detail from './Detail';
import AppBar from './AppBar';
import './App.css';

function AppContent() {
  const [, setScrolled] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();

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
