import React, { useState, useEffect } from 'react';
import pixabayAPI from 'services/pixabay-api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (query !== '') {
      fetchImages(query);
    }
  }, [query]);

  const handleFormSubmit = query => {
    setQuery(query);
    setImages(null);
    setPage(1);
  };

  const fetchImages = async query => {
    try {
      setLoading(true);
      const response = await pixabayAPI.fetchImagesWithQuery(query, page);
      setImages(response.hits);
      setPage(page + 1);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await pixabayAPI.fetchImagesWithQuery(query, page);
      setImages([...images, ...response.hits]);
      setPage(page + 1);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const setImageURL = image => {
    setModalImage(image);
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16',
        paddingBottom: '24',
      }}
    >
      {isModalOpen && (
        <Modal
          onClose={setImageURL}
          className="modal"
          modalImage={modalImage}
        />
      )}

      <Searchbar onSubmit={handleFormSubmit} />

      {images !== null && (
        <ImageGallery setImageURL={setImageURL} images={images} />
      )}

      {loading && <Loader />}

      {images && !loading && <Button onClick={handleClick} />}
    </div>
  );
}
