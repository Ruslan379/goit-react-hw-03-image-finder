import { Component } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

import pixabayAPI from 'services/pixabay-api.js';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';


import css from 'components/ImageGallery/ImageGallery.module.css' //todo = старый вариант импорта стилей



export class ImageGallery extends Component {
  state = {
  page: 1,
  query: '',
  hits: [],
  isLoading: false,
  error: false,
  showModal: false,
  };


  //! для поиска largeImageURL
  image = {
    webURL: "",
    largeURL  : ""
  }


//* ================================ МЕТОДЫ ==========================================================
  //! ==> ОСНОВНОЙ БЛОК. Анализ props и state + ЗАПРОС ==> 1-ый ВАРИАНТ
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.query !== this.props.query
    ) {
      this.setState({
        page: 1,
        query: this.props.query,
        hits: [],
      });
    }

    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.setState({ isLoading: true }); 
      //! Делаем fetch-запрос с помощью services/pixabay-api.js
      setTimeout(() => {
      pixabayAPI
        .fetchPixabay(this.state.query, this.state.page)
        .then(response => {
          //!  Прверка hits на пустой массив:
          if (response.hits[0] === undefined) {
        toast.warning('Нет такой темы'); 
        this.setState ({
          hits: [],
          isLoading: false
        });
        return;
          } else {
            this.setState(prevState  => ({
              hits: [...prevState.hits, ...response.hits],
              isLoading: false
            }))
          };
        })
        .catch(error => {
          this.setState({ error, isLoading: false });
          console.log(error);
        });
      }, 1500);
      //! Передача пропса this.state в App
      // this.props.onSubmit(this.state); 
    }
  };



  //! Кнопка loadMore
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  }
  


  //! Инверсия showModal для открытия/закрытия МОДАЛКИ
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  }; 



  //! Кликаем в картинку, ищем её largeImageURL, откываем МОДАЛКУ с картинкой
  handleBackdropClick1 = event => {
    this.toggleModal()
    const i = this.state.hits.findIndex(hit => hit.webformatURL === event.target.src)
    this.image.largeURL = this.state.hits[i].largeImageURL
  };




//* ================================ RENDER ==========================================================
  render() {
    const { hits, isLoading, showModal } = this.state


    return (
      < >
        {(hits[0] === undefined && isLoading === false) && (
          <div
            style={{ margin: '0 auto' }}
          >
            <h1>Введите тему</h1>
          </div>
        )}
        
        <ul
          className={css.ImageGallery}
          onClick={this.handleBackdropClick1}
        >
          <ImageGalleryItem hits={hits} />

        </ul>


        {isLoading && <Loader />}

        {(hits[0] !== undefined) && <Button onClick={this.loadMore} />}
        

        
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img
              src={this.image.largeURL}
              alt=""
            />
          </Modal>
        )}
      </>
    );
  }
}


ImageGallery.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};














//! OLD --------------------------------------------------------------------------
// import React from 'react';
// import PropTypes from 'prop-types';

// // import classNames from 'classnames';

// // import 'components/ContactList/ContactList.css';
// import css from 'components/ImageGallery/ImageGallery.module.css' //todo = старый вариант импорта стилей




// export const ImageGallery = ({ hits }) => (
//         <ul className={css.ImageGallery}>
//           {hits.map(({ id, webformatURL, largeImageURL }) => (
//             <li
//               key={id}
//               // className="gallery-item"
//               className={css.ImageGalleryItem}
//             >
//               <img
//                 className={css.ImageGalleryItemImage}
//                 src={webformatURL}
//                 alt=""
//               />
//           </li>
//           ))}
//         </ul>
// );


// ImageGallery.propTypes = {
//   hits: PropTypes.array.isRequired,
  
// };



// // export default Filter;
