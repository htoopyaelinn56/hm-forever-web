import React, { useState } from 'react';
import {useParams} from 'react-router-dom';
import AppBar from './AppBar';
import './Detail.css';

// Example static data for cosmetics (should match Home.tsx)
const items = [
    {
        id: 1,
        name: 'Lipstick',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'A beautiful lipstick for any occasion.'
    },
    {
        id: 2,
        name: 'Foundation',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Smooth foundation for flawless skin.'
    },
    {
        id: 3,
        name: 'Mascara',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Mascara for stunning lashes.'
    },
    {
        id: 4,
        name: 'Blush',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Blush for a natural glow.'
    },
    {
        id: 5,
        name: 'Eyeliner',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Perfect eyeliner for sharp looks.'
    },
    {
        id: 6,
        name: 'Concealer',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Covers imperfections flawlessly.'
    },
    {
        id: 7,
        name: 'Powder',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Matte finish powder.'
    },
    {
        id: 8,
        name: 'Highlighter',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Glow with this highlighter.'
    },
    {
        id: 9,
        name: 'Bronzer',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Sun-kissed bronzer.'
    },
    {
        id: 10,
        name: 'Primer',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Smooth base primer.'
    },
    {
        id: 11,
        name: 'Setting Spray',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Keeps makeup in place.'
    },
    {
        id: 12,
        name: 'Lip Gloss',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Shiny lip gloss.'
    },
    {
        id: 13,
        name: 'Lip Balm',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Moisturizing lip balm.'
    },
    {
        id: 14,
        name: 'Brow Pencil',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Define your brows.'
    },
    {
        id: 15,
        name: 'Brow Gel',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Set your brows.'
    },
    {
        id: 16,
        name: 'Eyeshadow',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Vibrant eyeshadow.'
    },
    {
        id: 17,
        name: 'Contour Kit',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Sculpt your face.'
    },
    {
        id: 18,
        name: 'Makeup Remover',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Gentle makeup remover.'
    },
    {
        id: 19,
        name: 'Face Mask',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Hydrating face mask.'
    },
    {
        id: 20,
        name: 'Serum',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Nourishing serum.'
    },
    {
        id: 21,
        name: 'Moisturizer',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Daily moisturizer.'
    },
    {
        id: 22,
        name: 'Sunscreen',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Protects from sun.'
    },
    {
        id: 23,
        name: 'Toner',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Refreshing toner.'
    },
    {
        id: 24,
        name: 'Cleansing Oil',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Deep cleansing oil.'
    },
    {
        id: 25,
        name: 'Sheet Mask',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Soothing sheet mask.'
    },
    {
        id: 26,
        name: 'Face Wash',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Gentle face wash.'
    },
    {
        id: 27,
        name: 'Night Cream',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Repairing night cream.'
    },
    {
        id: 28,
        name: 'Eye Cream',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Brightening eye cream.'
    },
    {
        id: 29,
        name: 'Hand Cream',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Softening hand cream.'
    },
    {
        id: 30,
        name: 'Body Lotion',
        image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true',
        description: 'Moisturizing body lotion.'
    },
];

const Detail: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const item = items.find(i => i.id === Number(id));
    const [imageLoaded, setImageLoaded] = useState(false);

    if (!item) return <div className="detail-notfound">Item not found.</div>;

    return (
        <div>
            <AppBar title="Detail" onBackClick={() => window.history.back()}/>
            <div className="detail-container">
                <div className="detail-main-image-wrapper">
                    {!imageLoaded && (
                        <div className="detail-main-image-placeholder" />
                    )}
                    <img
                        className="detail-main-image"
                        src={item.image}
                        alt={item.name}
                        style={{ display: imageLoaded ? 'block' : 'none' }}
                        onLoad={() => setImageLoaded(true)}
                    />
                </div>
                <div className="detail-info">
                    <h2 className="detail-title">{item.name}</h2>
                    <div className="detail-price">$19.99</div>
                    <div className="detail-description">{item.description}</div>
                </div>
                <div className="detail-description-images-grid">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <img
                            key={n}
                            className="detail-description-image"
                            src={item.image}
                            alt={`Description ${n}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Detail;
