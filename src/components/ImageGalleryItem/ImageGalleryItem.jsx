import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ src, largeImageURL, onClick }) => {
    return (
        <li className={css.ImageGalleryItem}>
            <img className={css.ImageGalleryItemImage}
                src={src}
                alt=""
                onClick={() => onClick(largeImageURL)} />
        </li>
    );
};

ImageGalleryItem.propTypes = {
    src: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };