import React, {useEffect, useState} from 'react';
import './AppBar.css';

interface AppBarProps {
    title: string;
    onBackClick?: () => void; // Callback for back button click
}

const AppBar: React.FC<AppBarProps> = ({title, onBackClick}) => {
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
            <div className="custom-appbar-left">
                {onBackClick && (
                    <button className="custom-appbar-back" onClick={onBackClick} aria-label="Back">
                        <svg width="48" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.5 19L8.5 12L15.5 5" stroke={scrolled ? "#000000" : "#ffffff"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                )}
                <div className="custom-appbar-title">{title}</div>
            </div>
            {!onBackClick && <div className="custom-appbar-search">
                <input type="text" placeholder="Search..."/>
            </div>}
        </div>
    );
};

export default AppBar;
