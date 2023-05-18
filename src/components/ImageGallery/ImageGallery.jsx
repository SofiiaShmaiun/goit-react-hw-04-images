import React from 'react';
import { Gallery } from '../styled';
import { GalleryItem } from '../styled';
import PropTypes from 'prop-types';

export default function ImageGallery({ images, setImageURL }) {
  return (
    <Gallery>
      {' '}
      {images.map(im => (
        <GalleryItem key={im.id} onClick={() => setImageURL(im.largeImageURL)}>
          <img src={im.webformatURL} alt={im.tags} className="gallery-image" />
        </GalleryItem>
      ))}
    </Gallery>
  );
}

ImageGallery.propTypes = {
  setImageURL: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
};
