import React, {useEffect, useState} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import AppBar from './AppBar';
import './Detail.css';
import {getItem, ItemData} from './api/appwriteService';
import {formatPriceWithCurrency} from './utils/formatters';

// Simple in-memory cache for item details
const itemCache: Record<string, ItemData> = {};

const Detail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const passedItem = (location.state as { item?: ItemData })?.item;
    const [item, setItem] = useState<ItemData | null>(passedItem || null);
    const [loading, setLoading] = useState(!passedItem);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>('');

    useEffect(() => {
        // If we don't have an ID, we can't fetch anything
        if (!id) {
            setError('No item ID provided');
            setLoading(false);
            return;
        }

        // If we already have an item from navigation state, no need to fetch
        if (passedItem) {
            // Cache the passed item for future use
            itemCache[id] = passedItem;
            setItem(passedItem);
            setLoading(false);
            return;
        }

        // Check cache first
        if (itemCache[id]) {
            setItem(itemCache[id]);
            setLoading(false);
            return;
        }

        // Fetch from server (this happens on refresh or direct URL access)
        setLoading(true);
        setError(null);
        getItem(id)
            .then(data => {
                itemCache[id] = data;
                setItem(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to fetch item details');
                setLoading(false);
            });
    }, [id, passedItem]);

    // Set initial selected image when item is loaded
    useEffect(() => {
        if (item && item.imageList && item.imageList.length > 0) {
            setSelectedImage(item.imageList[0]);
        } else if (item && item.image) {
            setSelectedImage(item.image);
        }
    }, [item]);

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
                    <div>
                        <img src={selectedImage || item.image} alt={item.name} className="detail-image" />
                        {item.imageList && item.imageList.length > 0 && (
                            <div>
                                {item.imageList.map((imgUrl: string, idx: number) => (
                                    <img
                                        key={idx}
                                        src={imgUrl}
                                        alt={`${item.name} ${idx + 1}`}
                                        style={{
                                            width: 60,
                                            height: 60,
                                            objectFit: 'cover',
                                            margin: 4,
                                            borderRadius: 8,
                                            border: selectedImage === imgUrl ? '2px solid #000' : '2px solid transparent',
                                            opacity: selectedImage === imgUrl ? 1 : 0.5,
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => setSelectedImage(imgUrl)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                   <div className="detail-content">
                       <h2 className="detail-title">{item.name}</h2>
                       <div className="detail-price">{formatPriceWithCurrency(Math.round(item.price || 0))}</div>
                       <p className="detail-description">{item.description}</p>
                   </div>
                </div>
            )}
        </div>
    );
};

export default Detail;
