import React, {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import AppBar from './AppBar';
import './Detail.css';

// Example static data for cosmetics (should match Home.tsx)
const items = [
    {
        id: 1,
        name: 'Lipstick',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'A beautiful lipstick for any occasion.'
    },
    {
        id: 2,
        name: 'Foundation',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Smooth foundation for flawless skin.'
    },
    {
        id: 3,
        name: 'Mascara',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Mascara for stunning lashes.'
    },
    {
        id: 4,
        name: 'Blush',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Blush for a natural glow.'
    },
    {
        id: 5,
        name: 'Eyeliner',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Perfect eyeliner for sharp looks.'
    },
    {
        id: 6,
        name: 'Concealer',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Covers imperfections flawlessly.'
    },
    {
        id: 7,
        name: 'Powder',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Matte finish powder.'
    },
    {
        id: 8,
        name: 'Highlighter',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Glow with this highlighter.'
    },
    {
        id: 9,
        name: 'Bronzer',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Sun-kissed bronzer.'
    },
    {
        id: 10,
        name: 'Primer',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Smooth base primer.'
    },
    {
        id: 11,
        name: 'Setting Spray',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Keeps makeup in place.'
    },
    {
        id: 12,
        name: 'Lip Gloss',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Shiny lip gloss.'
    },
    {
        id: 13,
        name: 'Lip Balm',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Moisturizing lip balm.'
    },
    {
        id: 14,
        name: 'Brow Pencil',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Define your brows.'
    },
    {
        id: 15,
        name: 'Brow Gel',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Set your brows.'
    },
    {
        id: 16,
        name: 'Eyeshadow',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Vibrant eyeshadow.'
    },
    {
        id: 17,
        name: 'Contour Kit',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Sculpt your face.'
    },
    {
        id: 18,
        name: 'Makeup Remover',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Gentle makeup remover.'
    },
    {
        id: 19,
        name: 'Face Mask',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Hydrating face mask.'
    },
    {
        id: 20,
        name: 'Serum',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Nourishing serum.'
    },
    {
        id: 21,
        name: 'Moisturizer',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Daily moisturizer.'
    },
    {
        id: 22,
        name: 'Sunscreen',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Protects from sun.'
    },
    {
        id: 23,
        name: 'Toner',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Refreshing toner.'
    },
    {
        id: 24,
        name: 'Cleansing Oil',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Deep cleansing oil.'
    },
    {
        id: 25,
        name: 'Sheet Mask',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Soothing sheet mask.'
    },
    {
        id: 26,
        name: 'Face Wash',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Gentle face wash.'
    },
    {
        id: 27,
        name: 'Night Cream',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Repairing night cream.'
    },
    {
        id: 28,
        name: 'Eye Cream',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Brightening eye cream.'
    },
    {
        id: 29,
        name: 'Hand Cream',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
        description: 'Softening hand cream.'
    },
    {
        id: 30,
        name: 'Body Lotion',
        image: 'https://s3.tebi.io/hm-forever/Vaseline_Gold.png',
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
                        <div className="detail-main-image-placeholder"/>
                    )}
                    <img
                        className={`detail-main-image ${imageLoaded ? 'detail-main-image-visible' : 'detail-main-image-hidden'}`}
                        src={item.image}
                        alt={item.name}
                        onLoad={() => setImageLoaded(true)}
                    />
                </div>
                <div className="detail-info">
                    <h2 className="detail-title">{item.name}</h2>
                    <div className="detail-price">$19.99</div>
                    <div className="detail-description">{item.description}</div>
                </div>
                <ResponsiveGridComponent maxWidth={50} imageList={[
                    item.image, item.image, item.image, item.image, item.image,
                ]}/>
            </div>
        </div>
    );
};

// Custom hook similar to Flutter's SliverGridDelegateWithMaxCrossAxisExtent
const useResponsiveGrid = (maxCrossAxisExtent = 200, crossAxisSpacing = 10) => {
    const [columns, setColumns] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateColumns = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const availableWidth = containerWidth - crossAxisSpacing;
                const itemWidth = maxCrossAxisExtent + crossAxisSpacing;
                const calculatedColumns = Math.max(1, Math.floor(availableWidth / itemWidth));
                setColumns(calculatedColumns);
            }
        };

        updateColumns();
        window.addEventListener('resize', updateColumns);

        return () => window.removeEventListener('resize', updateColumns);
    }, [maxCrossAxisExtent, crossAxisSpacing]);

    return {containerRef, columns};
};

interface ResponsiveGridProps {
    maxWidth?: number; // Optional because it has a default value
    gap?: number;       // Optional because it has a default value
    imageList?: string[]; // Array of strings, optional because it has a default value
}

// Reusable component
const ResponsiveGridComponent = ({maxWidth = 200, gap = 10, imageList = []}: ResponsiveGridProps) => {
    const {containerRef, columns} = useResponsiveGrid(maxWidth, gap);

    return (
        <div
            ref={containerRef}
            className="responsive-grid-container"
            style={{
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: `${gap}px`
            }}
        >
            {imageList.map(item => (
                <div key={item}>
                    <img
                        src={item}
                        alt="Grid item"
                        className="grid-item-image"
                        style={{height: `${maxWidth}px`}}
                    />
                </div>
            ))}
        </div>
    );
};

export default Detail;
