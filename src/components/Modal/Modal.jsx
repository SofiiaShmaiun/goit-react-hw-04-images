import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { ImageModal } from '../styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeyDown);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleKeyDown);
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <ImageModal onClick={this.handleBackdropClick}>
        {this.props.children}
      </ImageModal>,
      modalRoot
    );
  }
}
