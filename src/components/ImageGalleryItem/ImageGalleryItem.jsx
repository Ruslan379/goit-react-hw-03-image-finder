// import React from 'react'; //?
import { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'components/Modal/Modal';

import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css' 




export class ImageGalleryItem extends Component {
  static propTypes = {
    hits: PropTypes.array.isRequired,
    webformatURL: PropTypes.string.isRequired
  };
  

  state = {
  showModal: false,
  largeURL: "",
  };


  //! Инверсия showModal для открытия/закрытия МОДАЛКИ
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  }; 


  //! Кликаем в картинку, ищем её largeImageURL, откываем МОДАЛКУ с картинкой
  handleBackdropClick = event => {
    if (event.target.src) {
      this.toggleModal()
      const i = this.props.hits.findIndex(hit => hit.webformatURL === event.target.src)
      this.setState({ largeURL: this.props.hits[i].largeImageURL });
    } else return;
  };


  render() {
    const { showModal, largeURL } = this.state
    // const { hits } = this.props
    const { webformatURL } = this.props
 

    return (
      <>
        <li className={css.ImageGalleryItem}
          onClick={this.handleBackdropClick}
        >
          <img
            className={css.ImageGalleryItemImage}
            src={webformatURL}
            alt=""
          />
        </li>
      
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img
              src={largeURL}
              alt=""
            />
          </Modal>
        )}
      </>
    );
  }
}

// ImageGalleryItem.propTypes = {
//   hits: PropTypes.array.isRequired,
//   webformatURL: PropTypes.string.isRequired
// };


