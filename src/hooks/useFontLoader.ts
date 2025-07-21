import { useState, useEffect } from 'react';

export const useFontLoader = (fontFamily: string, fontWeight?: string) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      try {
        // Check if FontFace API is supported
        if ('fonts' in document) {
          // Wait for the specific font to be loaded
          await document.fonts.load(`${fontWeight || '400'} 16px "${fontFamily}"`);
          
          // Double check if the font is actually available
          const fontAvailable = document.fonts.check(`${fontWeight || '400'} 16px "${fontFamily}"`);
          
          if (fontAvailable) {
            setFontLoaded(true);
          } else {
            // Fallback: wait for all fonts to load
            await document.fonts.ready;
            setFontLoaded(true);
          }
        } else {
          // Fallback for browsers without FontFace API
          // Use a simple timeout as a fallback
          setTimeout(() => {
            setFontLoaded(true);
          }, 2000);
        }
      } catch (error) {
        console.warn('Font loading failed:', error);
        // Set to true anyway to prevent infinite loading
        setFontLoaded(true);
      }
    };

    loadFont();
  }, [fontFamily, fontWeight]);

  return fontLoaded;
};
