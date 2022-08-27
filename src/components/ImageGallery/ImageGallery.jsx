import { Component } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';

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

  //! +++++++++++++
  image = {
    webformatURL: "",
    largeImageURL  : ""
  }
// imgSrc = null

  //! Формируем строку URL-запроса:
  API_KEY = '28759369-3882e1068ac26fe18d14affeb';
  BASE_URL = 'https://pixabay.com/api/';
  per_page = 12;
  // url = `${this.BASE_URL}?key=${this.API_KEY}&q=${this.state.query}&image_type=photo&orientation=horizontal&page=${this.state.page}&per_page=${this.per_page}`; //! with API_KEY
  


//* ================================ МЕТОДЫ ==========================================================
  //? --------------------------------------------------------
  // async componentDidMount() {
  //   try {
  //   this.setState({ isLoading: true })
  //   // setTimeout(() => { //?
  //     const { hits } = await this.fetchHits(this.url)
  //     this.setState({ hits, isLoading: false });
  //         console.log("fetch hits: ", hits); //!
  //         console.log("fetch hits[0]: ", hits[0]); //!
  //         console.log("fetch hits[0].id: ", hits[0].id); //!
  //         console.log("fetch hits[0].webformatURL: ", hits[0].webformatURL); //!
  //       console.log("fetch hits[0].largeImageURL: ", hits[0].largeImageURL); //!
  //   } catch (error) {
  //     this.setState({ error: true, isLoading: false });
  //     console.log(error);
  //     }
  //       // return hits //?
  //       // }) //?
  //       // .then(hits => this.setState({ hits }))  //?
  //       // .finally(() => this.setState({ isLoading: false })); //?
  //   // }, 2000); //?
  // }


  //? перенесен в Searchbar
  // handleChange = event => {
  //   // console.log(event.currentTarget); //!
  //   // console.log(event.currentTarget.name); //!
  //   console.log(event.currentTarget.value); //!

  //   // this.setState({ name: event.currentTarget.value }); //?
  //   // this.setState({ [event.currentTarget.name]: event.currentTarget.value }); //?

  //   const { value } = event.currentTarget;

  //   // if (value.trim() === '') {
  //   //   console.log(value);
  //   //   // alert('Введите имя');
  //   //   toast.error('Введите имя'); //? РАБОТАЕТ, но НЕ ПРАВИЛЬНО!!!
  //   //   return;
  //   // }

  //     this.setState({ query: value });
  // };


//? перенесен в Searchbar
  // handleSubmit = event => {
  //   event.preventDefault();
  //   // console.log(event.target.elements.query.value); //!

  //   if (event.target.elements.query.value === '') {
  //     toast.error('Поле не должно быть пустым'); 
  //     return;
  //   };

  //   this.setState ({
  //     page: 1,
  //     query: event.target.elements.query.value,
  //     hits: [],
  //   });
  //   event.target.reset()
  //   // this.props.onSubmit(name, number);
  //   // this.reset();
  // };

  //! axios.get-запрос: (с async/await)
  async fetchHits() {
    try { 
    // console.log("fetchHits this.state.query: ", this.state.query); //!
    const url = `${this.BASE_URL}?key=${this.API_KEY}&q=${this.state.query}&image_type=photo&orientation=horizontal&page=${this.state.page}&per_page=${this.per_page}`; 
    // console.log("fetchHits: ", url); //!
    const response = await axios.get(url);
    // const newHits = await response.data;
    // const { hits } = newHits;
    // console.log(hits); //!
    // return hits;
    return response.data;
      } catch (error) { 
        this.setState({ error: true, isLoading: false }); 
        console.log(error); 
    } 
  };


  async componentDidUpdate(prevProps, prevState) {
    try { 
      //? принимаем props от ImageGallery query={query} из App
      // const query = this.props.query;

      if (
        prevProps.query !== this.props.query
      ) {
        console.log("Изменилось имя запроса");
        console.log("prevProps.query: ", prevProps.query); //!
        console.log("this.props.query: ", this.props.query); //!
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
        console.log("prevState.page: ", prevState.page); //!
        console.log("this.state.page: ", this.state.page); //!
    
        console.log("prevState.query: ", prevState.query); //!
        console.log("this.state.query: ", this.state.query); //!

        this.setState({ isLoading: true }); 
        const { hits } = await this.fetchHits();
        console.log("ImageGallery - hits: ", hits);
        //!  Прверка hits на пустой массив:
        if (hits[0] === undefined) {
          // console.log("undefined hits[0]: ", hits[0]); //!
          toast.warning('Нет такой темы'); 
          this.setState ({
            hits: [],
            isLoading: false
          });
          // console.log("undefined this.state.hits: ", this.state.hits); //!
          return;
        };
        // console.log("prevState.hits: ", prevState.hits); //!
        // console.log("this.state.hits: ", this.state.hits); //!
        // console.log("fetch hits: ", hits); //!
        // this.setState({ hits, isLoading: false }); //? так только 12 новых фото
        this.setState(prevState  => ({
          hits: [...prevState.hits, ...hits],
          isLoading: false
        }));
          // console.log("fetch hits: ", hits); //!
          // console.log("fetch hits[0]: ", hits[0]); //!
          // console.log("fetch hits[0].id: ", hits[0].id); //!
          // console.log("fetch hits[0].webformatURL: ", hits[0].webformatURL); //!
          // console.log("fetch hits[0].largeImageURL: ", hits[0].largeImageURL); //!
        console.log("ImageGallery - this.state: ", this.state);
        this.props.onSubmit(this.state); 
      }
    } catch (error) { 
      this.setState({ error: true, isLoading: false }); 
      console.log(error); 
      } 
  }


  //! Кнопка loadMore
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  }
  

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  }; 



  handleBackdropClick1 = event => {
    // this.setState(({ showModal }) => ({
    //   showModal: !showModal,
    // }));
    this.toggleModal()
    console.log('Кликнули в бекдроп ImageGallery');

    // console.log('currentTarget: ', event.currentTarget); //!
    console.log('event.target.src: ', event.target.src); //!
    this.image.webformatURL = event.target.src;
    console.log('this.image.webformatURL: ', this.image.webformatURL);
  };


//* ================================ RENDER ==========================================================
  render() {
    const { hits, isLoading, showModal } = this.state
    // console.log("render - this.props.query: ", this.props.query); //!
    // console.log("render ImageGallery - this.state: ", this.state); //!
    console.log("render this.image.webformatURL: ", this.image.webformatURL); //!
    
    // console.log(this.url); //!
    // console.log("render hits: ", hits); //!

    // console.log("render hits[0]: ", hits[0]); //!
    // console.log("render hits[0].id: ", hits[0].id); //!
    
    // console.log("this.state.hits: ", this.state.hits); //!
    // console.log("this.state.hits[0]: ", this.state.hits[0]); //!
    // console.log("this.state.hits[0].id: ", this.state.hits[0].id); //!

    return (
      < >
        {(hits[0] === undefined && isLoading === false) && <div style={{ margin: '0 auto' }}><h1>Введите тему</h1></div>}
        <ul
          className={css.ImageGallery}
          onClick={this.handleBackdropClick1}
        >
          <ImageGalleryItem hits={hits} />
          {/* {hits.map(({ id, webformatURL, largeImageURL }) => (
            <li
              key={id}
              className={css.ImageGalleryItem}
            >
              <img
                className={css.ImageGalleryItemImage}
                src={webformatURL}
                alt=""
              />
            </li>
          ))} */}
        </ul>

        {/* {(hits[0] !== undefined) && (
          <button
            type='button'
            onClick={this.toggleModal}
          >
            Открыть/Закрыть
          </button>)} */}
        

        {isLoading && <Loader />}

        {(hits[0] !== undefined) && <Button onClick={this.loadMore} />}
        
        {/* {(hits[0] !== undefined) && <Modal hits={hits} />} */}
        {/* {showModal && <Modal hits={hits} />} */}
        
        {showModal && (
          <Modal onClose={this.toggleModal}>
            {/* <h1>Привет</h1> */}
            <img
              /* src={hits[0].largeImageURL} */
              src={this.image.webformatURL}
              alt=""
            />
            {/* <button
              type='button'
              onClick={this.toggleModal}
            >
              Закрыть
            </button> */}
          </Modal>
        )}
      </>
    );
  }
}















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
