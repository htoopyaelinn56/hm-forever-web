import React, { useEffect, useState } from 'react';
import './AppBar.css';

interface AppBarProps {
  title: string;
}

const AppBar: React.FC<AppBarProps> = ({ title }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`custom-appbar${scrolled ? ' scrolled' : ''}`}>
      <div className="custom-appbar-title">{title}</div>
      <div className="custom-appbar-search">
        <input type="text" placeholder="Search..." />
      </div>
    </div>
  );
};

export default AppBar;
