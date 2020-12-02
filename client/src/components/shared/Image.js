import React, { useState } from 'react';
import ImageSkeleton from '../Skeleton/ImageSkeleton';

const Image = ({source, cssClass}) => {
    const [loading, setLoading] = useState(true);

    const handleImageLoad = e => setLoading(false);

    return(
        <>
            {loading && <ImageSkeleton/>}
            <img src={source} onLoad={handleImageLoad} className={cssClass} hidden={loading}/>
        </>
    );
};

export default Image;