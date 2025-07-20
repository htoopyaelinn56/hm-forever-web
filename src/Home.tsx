import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AppBar from './AppBar';
import {collectionId, databaseId, fetchItems, ItemData} from './api/appwriteService';

// Utility to cycle through a fixed set of background colors for item name and price
const itemHexColors = [
    '#0051ff', // blue
    '#ffbb00', // yellow
    '#00fff2', // teal
    '#5f05f0', // purple
    '#f005cc', // pink
    '#fa0036', // red
    '#ff9eff', // light pink
];

// Convert hex to rgba with given alpha
function getItemHexColor(idx: number) {
    return itemHexColors[idx % itemHexColors.length];
}

// Utility to convert hex to rgba with alpha
function hexToRgba(hex: string, alpha: number) {
    const h = hex.replace('#', '');
    const bigint = parseInt(h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r},${g},${b},${alpha})`;
}

const Home: React.FC = () => {
    const [items, setItems] = useState<ItemData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchItems(databaseId, collectionId)
            .then(data => {
                setItems(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to fetch items');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <AppBar title="H&M Forever"/>
            <div className="home-container">
                <div className="item-grid">
                    {items.map((item, idx) => {
                        const borderColor = getItemHexColor(idx);
                        const bgColor = hexToRgba(borderColor, 0.5);
                        return (
                            <Link key={item.id} to={`/detail/${item.id}`} className="item-link">
                                <div className="card-stack tooltip-parent">
                                    <div className="card-bg" style={{background: bgColor}}/>
                                    <div className="item-card">
                                        <img src={item.image} alt={item.name} className="item-image-full" style={{background: bgColor}}/>
                                        <div className="item-info">
                                            <div className="item-name-left">{item.name}</div>
                                            <div className="item-price">${item.price.toFixed(2)}</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Home;
