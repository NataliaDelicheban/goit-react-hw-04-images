import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({images, onClick}) => {
    return (
        <ul className={css.ImageGallery}>
            {images.map(({ id, webformatURL, largeImageURL }) => (
                <ImageGalleryItem
                    key={id}
                    src={webformatURL}
                    largeImageURL={largeImageURL}
                    onClick={onClick}
                    />
            ))}
        </ul>
    );
}

ImageGallery.propTypes = {
    images: PropTypes.array,
    onClick: PropTypes.func.isRequired,
  }