import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import AppBar from './AppBar';
import './Detail.css';
import {getItem, databaseId, collectionId, ItemData} from './api/appwriteService';

const Detail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<ItemData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError('No item ID provided');
            setLoading(false);
            return;
        }
        getItem(databaseId, collectionId, id)
            .then(data => {
                setItem(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to fetch item details');
                setLoading(false);
            });
    }, [id]);

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
