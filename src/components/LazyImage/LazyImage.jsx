import React, { useState, useEffect } from 'react';

const LazyImage = ({
    src,
    alt, className,
    onLoad,
    style,
    onError,
    drag,
    ...props
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (src) {
            setIsLoaded(true);
            onLoad && onLoad();
        }
    }, [src, onLoad, onError]);

    return (
        <img
            src={src}
            alt={alt}
            className={`${className} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-100`}
            loading="lazy"
            decoding="async"
            style={style}
            draggable={drag}
            onError={(e) => {
                console.error('Image load error:', e);
                onError && onError();
            }}
            {...props}
        />
    );
};

export default LazyImage;
