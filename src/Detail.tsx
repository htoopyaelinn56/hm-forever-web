import React, {useEffect, useState} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import AppBar from './AppBar';
import './Detail.css';
import {getItem, databaseId, collectionId, ItemData} from './api/appwriteService';

// Simple in-memory cache for item details
const itemCache: Record<string, ItemData> = {};

const Detail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const passedItem = (location.state as { item?: ItemData })?.item;
    const [item, setItem] = useState<ItemData | null>(passedItem || null);
    const [loading, setLoading] = useState(!passedItem);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (item || !id) return;
        if (itemCache[id]) {
            setItem(itemCache[id]);
            setLoading(false);
            return;
        }
        getItem(databaseId, collectionId, id)
            .then(data => {
                itemCache[id] = data;
                setItem(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to fetch item details');
                setLoading(false);
            });
    }, [id, item]);

    return (
        <div>
            <AppBar title="Item Detail" onBackClick={() => window.history.back()}/>
            {loading && (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh'}}>
                    <div className="shimmer-bg shimmer-img" style={{width: 300, height: 300, borderRadius: 16}} />
                </div>
            )}
            {error && (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh'}}>
                    <div style={{color: 'red', fontSize: '1.5rem', textAlign: 'center'}}>{error}</div>
                </div>
            )}
            {!loading && !error && item && (
                <div className="detail-container">
                    <img src={item.image} alt={item.name} className="detail-image" />
                    <h2 className="detail-title">{item.name}</h2>
                    <p className="detail-description">{item.description}</p>
                    <div className="detail-price">${item.price?.toFixed(2)}</div>
                </div>
            )}
        </div>
    );
};

export default Detail;
