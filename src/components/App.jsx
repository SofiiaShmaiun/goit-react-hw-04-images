import React, { Component } from 'react';
import pixabayAPI from 'services/pixabay-api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { GalleryItem } from './styled';
import Button from 'components/Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    imageName: '',
    page: 1,
    showModal: false,
    loading: false,
    error: null,
    image: null,
    largeImageURL: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.imageName;
    const nextQuery = this.state.imageName;

    if (prevQuery !== nextQuery) {
      this.fetchImages();
    }
  }

  handleFormSubmit = query => {
    this.setState({
      imageName: query,
      image: null,
      page: 1,
    });
  };

  fetchImages = () => {
    const { imageName, page } = this.state;

    this.setState({ loading: true });
    pixabayAPI
      .fetchImagesWithQuery(imageName, page)
      .then(images =>
        this.setState(prevState => ({
          image: images.hits,
          page: prevState.page + 1,
        }))
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleClick = () => {
    const { imageName, page } = this.state;

    this.setState({ loading: true });
    pixabayAPI
      .fetchImagesWithQuery(imageName, page)
      .then(images =>
        this.setState(prevState => ({
          image: [...prevState.image, ...images.hits],
          page: prevState.page + 1,
        }))
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  setActiveUrl = url => {
    this.setState({ largeImageURL: url });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { image, loading, showModal, largeImageURL } = this.state;

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16',
          paddingBottom: '24',
        }}
      >
        {showModal && (
          <Modal onClose={this.setActiveUrl} className="modal">
            <img src={largeImageURL} alt="#" />
          </Modal>
        )}

        <Searchbar onSubmit={this.handleFormSubmit} />

        {image !== null && (
          <ImageGallery>
            {image.map(im => (
              <GalleryItem
                key={im.id}
                onClick={() => this.setActiveUrl(im.largeImageURL)}
              >
                <img
                  src={im.webformatURL}
                  alt={im.tags}
                  className="gallery-image"
                />
              </GalleryItem>
            ))}
          </ImageGallery>
        )}

        {loading && <Loader />}

        {image && !loading && <Button onClick={this.handleClick} />}
      </div>
    );
  }
}
