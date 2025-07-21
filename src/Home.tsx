import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {fetchItems, ItemData} from './api/appwriteService';
import {formatPriceWithCurrency} from './utils/formatters';

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

// Simple in-memory cache for items list (invalidated on browser refresh)
let itemsCache: ItemData[] | null = null;

const Home: React.FC<{ searchValue: string }> = ({ searchValue }) => {
    const [items, setItems] = useState<ItemData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (itemsCache) {
            setItems(itemsCache);
            setLoading(false);
            return;
        }
        fetchItems()
            .then(data => {
                itemsCache = data;
                setItems(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to fetch items');
                setLoading(false);
            });
    }, []);

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.description.toLowerCase().includes(searchValue.toLowerCase())
    );

    const shimmerCount = itemHexColors.length * 3;
    const shimmerArray = Array(shimmerCount).fill(0);

    const ShimmerCard: React.FC<{color: string}> = ({color}) => {
        const bgColor = hexToRgba(color, 0.5);
        return (
            <div className="card-stack tooltip-parent">
                <div className="card-bg shimmer-bg" style={{background: bgColor}} />
                <div className="item-card shimmer">
                    <div className="item-image-full shimmer-img" style={{background: bgColor}} />
                    <div className="item-info">
                        <div className="item-name-left"/>
                        <div className="item-price"/>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            {/* AppBar is now rendered in App.tsx */}
            {loading && (
                <div className="home-container">
                    <div className="item-grid">
                        {shimmerArray.map((_, idx) => (
                            <ShimmerCard key={idx} color={getItemHexColor(idx)} />
                        ))}
                    </div>
                </div>
            )}
            {error && (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh'}}>
                    <div style={{color: 'red', fontSize: '1.5rem', textAlign: 'center'}}>{error}</div>
                </div>
            )}
            {!loading && !error && (
                <div className="home-container">
                    <div className="item-grid">
                        {filteredItems.map((item, idx) => {
                            const borderColor = getItemHexColor(idx);
                            const bgColor = hexToRgba(borderColor, 0.5);
                            return (
                                <Link
                                    key={item.id}
                                    to={`/detail/${item.id}`}
                                    className="item-link"
                                    state={{ item }}
                                >
                                    <div className="card-stack tooltip-parent">
                                        <div className="card-bg" style={{background: bgColor}}/>
                                        <div className="item-card">
                                            <img src={item.image} alt={item.name} className="item-image-full" style={{background: bgColor}}/>
                                            <div className="item-info">
                                                <div className="item-name-left">{item.name}</div>
                                                <div className="item-price">{formatPriceWithCurrency(Math.round(item.price || 0))}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                        {/* Add empty grid cells if filteredItems.length < 5 */}
                        {filteredItems.length < 5 &&
                            Array.from({ length: 5 - filteredItems.length }).map((_, idx) => (
                                <div key={`empty-${idx}`} className="item-grid-empty" />
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
