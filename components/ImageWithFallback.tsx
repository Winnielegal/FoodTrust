import React, { useState, useEffect } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, fallbackSrc, ...props }) => {
  // FIX: The `src` prop might not be a string (e.g., a Blob), causing a type error on line 8.
  // Initialize state with `src` only if it's a string, otherwise use null.
  const [imgSrc, setImgSrc] = useState<string | null | undefined>(
    typeof src === 'string' ? src : null
  );

  useEffect(() => {
    // FIX: The `src` prop might not be a string, causing a type error on line 11.
    // Only update state if `src` is a string to prevent type errors.
    if (typeof src === 'string') {
      setImgSrc(src); // Reset the src if the prop changes
    } else {
      setImgSrc(null); // For non-string src types, use fallback.
    }
  }, [src]);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return <img src={imgSrc || fallbackSrc} onError={handleError} {...props} />;
};
