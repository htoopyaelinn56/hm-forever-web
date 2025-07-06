import React, { useEffect, useState } from 'react';
import './AppBar.css';

interface AppBarProps {
  title: string;
}

const AppBar: React.FC<AppBarProps> = ({ title }) => {
  const [scrolled, setScrolled] = useState(false);

  // did update widget flutter equivalent title != previous title reset scroll to top
    useEffect(() => {
        setScrolled(false);
        // set scroll position to top 0 too
        window.scrollTo(0, 0);
    }, [title]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
