import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from './AppBar';

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

// Add price to each item
type Item = {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
};

const items: Item[] = [
  { id: 1, name: 'Lipstick', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$12.99', description: 'A creamy lipstick for vibrant color.' },
  { id: 2, name: 'Foundation', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$18.50', description: 'Smooth foundation for flawless skin.' },
  { id: 3, name: 'Mascara', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$9.99', description: 'Lengthening mascara for bold lashes.' },
  { id: 4, name: 'Blush', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$11.49', description: 'Rosy blush for a natural glow.' },
  { id: 5, name: 'Eyeliner', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$7.99', description: 'Waterproof eyeliner for defined eyes.' },
  { id: 6, name: 'Concealer', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$13.99', description: 'Concealer for covering blemishes.' },
  { id: 7, name: 'Powder', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$10.99', description: 'Setting powder for a matte finish.' },
  { id: 8, name: 'Highlighter', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$14.99', description: 'Highlighter for a luminous glow.' },
  { id: 9, name: 'Bronzer', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$12.49', description: 'Bronzer for a sun-kissed look.' },
  { id: 10, name: 'Primer', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$15.99', description: 'Primer for long-lasting makeup.' },
  { id: 11, name: 'Setting Spray', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$8.99', description: 'Setting spray to lock in makeup.' },
  { id: 12, name: 'Lip Gloss', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$6.99', description: 'Glossy lip gloss for a shiny finish.' },
  { id: 13, name: 'Lip Balm', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$4.99', description: 'Moisturizing lip balm for soft lips.' },
  { id: 14, name: 'Brow Pencil', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$5.99', description: 'Brow pencil for defining eyebrows.' },
  { id: 15, name: 'Brow Gel', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$7.49', description: 'Brow gel for setting eyebrows in place.' },
  { id: 16, name: 'Eyeshadow', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$16.99', description: 'Pigmented eyeshadow for vibrant looks.' },
  { id: 17, name: 'Contour Kit', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$19.99', description: 'Contour kit for sculpting the face.' },
  { id: 18, name: 'Makeup Remover', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$8.49', description: 'Gentle makeup remover for all skin types.' },
  { id: 19, name: 'Face Mask', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$5.99', description: 'Nourishing face mask for a spa-like treatment.' },
  { id: 20, name: 'Serum', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$21.99', description: 'Serum for targeted skincare concerns.' },
  { id: 21, name: 'Moisturizer', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$17.99', description: 'Hydrating moisturizer for all-day moisture.' },
  { id: 22, name: 'Sunscreen', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$13.49', description: 'Broad-spectrum sunscreen for sun protection.' },
  { id: 23, name: 'Toner', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$9.49', description: 'Toner for balancing skin pH.' },
  { id: 24, name: 'Cleansing Oil', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$11.99', description: 'Cleansing oil for removing makeup and impurities.' },
  { id: 25, name: 'Sheet Mask', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$3.99', description: 'Hydrating sheet mask for a quick moisture boost.' },
  { id: 26, name: 'Face Wash', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$7.99', description: 'Gentle face wash for daily cleansing.' },
  { id: 27, name: 'Night Cream', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$18.99', description: 'Rich night cream for overnight hydration.' },
  { id: 28, name: 'Eye Cream', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$15.49', description: 'Eye cream for reducing dark circles and puffiness.' },
  { id: 29, name: 'Hand Cream', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$6.49', description: 'Hand cream for soft and smooth hands.' },
  { id: 30, name: 'Body Lotion', image: 'https://github.com/htoopyaelinn56/hnm_product_images/blob/main/images/babymild_perfume.jpg?raw=true', price: '$13.99', description: 'Moisturizing body lotion for all-day hydration.' },
];

const Home: React.FC = () => {
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    content: string;
    x: number;
    y: number;
  }>({ visible: false, content: '', x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent, description: string) => {
    setTooltip({
      visible: true,
      content: description,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div>
      <AppBar title="Home" />
      <div className="home-container">
        <div className="item-grid">
          {items.map((item, idx) => {
            const borderColor = getItemHexColor(idx);
            const bgColor = hexToRgba(borderColor, 0.5); // semi-transparent background
            return (
              <Link key={item.id} to={`/detail/${item.id}`} className="item-link">
                <div
                  className="card-stack tooltip-parent"
                  onMouseEnter={e => handleMouseEnter(e, item.description)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="card-bg" style={{ background: bgColor }} />
                  <div className="item-card">
                    <img src={item.image} alt={item.name} className="item-image-full" style={{ background: bgColor }} />
                    <div className="item-info">
                      <div className="item-name-left">{item.name}</div>
                      <div className="item-price">{item.price}</div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        {tooltip.visible && (
          <div
            className="item-tooltip floating-tooltip"
            style={{
              position: 'fixed',
              left: tooltip.x + 16,
              top: tooltip.y + 16,
              pointerEvents: 'none',
              zIndex: 9999,
            }}
          >
            {tooltip.content}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
