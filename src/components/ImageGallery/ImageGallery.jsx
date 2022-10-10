import { Component } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

import pixabayAPI from 'services/pixabay-api.js';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';


import css from 'components/ImageGallery/ImageGallery.module.css' 



export class ImageGallery extends Component {
  static propTypes = {
  query: PropTypes.string.isRequired,
};

  state = {
  page: 1,
  query: '',
  hits: [],
  isLoading: false,
  error: false,
  showButton: true, 
  };


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
      this.setState({ error: false, isLoading: true }); 
      //! Делаем fetch-запрос с помощью services/pixabay-api.js
      setTimeout(() => {
      pixabayAPI
        .fetchPixabay(this.state.query, this.state.page)

        .then(({ totalHits, hits, query, endOfCollection }) => {
          if (hits.length === 0) {  
            toast.warning(`Нет такой темы: ${query}`); 
            this.setState ({
              hits: [],
              isLoading: false
            });
          return;
          } else {
            if (this.state.page === 1) {
              toast.success(`По вашей теме найдено ${totalHits} изображений`, { autoClose: 3000 });
            };
              this.setState(prevState  => ({
                hits: [...prevState.hits, ...hits],
                isLoading: false,
                showButton: true
              }))
          };
          //! endOfCollection - это цифра еще НЕ ПРОСМОТРЕННЫХ элементов коллекции
          console.log("endOfCollection: ", endOfCollection); //!
          if (endOfCollection <= 0) {
            toast.info('Вы достигли конца результатов поиска', { autoClose: 3000 } ); 
            this.setState({ showButton: false });  //! Кнопка LOAD MORE => ПРЯЧЕМ
            return;
          }
        })
        //! Обработка ошибок
        .catch(error => {
          this.setState({ error: error.message, isLoading: false });
          console.log(error.message); //!
          toast.error(`Ошибка запроса: ${error.message}`, { position: "top-center", autoClose: 2000 } ); 
        });
      }, 1000);
      //! Передача пропса this.state в App
      // this.props.onSubmit(this.state); 
    }
  };



  //! Кнопка loadMore
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      showButton: false
    }));
  }
  



  render() {
    const { hits, isLoading, showButton, error } = this.state


    return (
      <>
        {error && (
          <div style={{ margin: '0 auto', color: 'red' }}>
            <h1>Ошибка запроса:</h1>
            <h2 style={{ textDecoration: "underline", fontStyle: 'italic', color: '#a10000' }}>!!! {error}</h2>
          </div>
        )}

        {(hits.length === 0 && isLoading === false) && (
          <div
            style={{ margin: '0 auto' }}
          >
            <h1>Введите тему</h1>
          </div>
        )}
        
        {hits.length > 0 &&
          (<ul className={css.ImageGallery}>
            {hits.map(({ id, webformatURL }) => (
              <ImageGalleryItem
                key={id}
                hits={hits}
                webformatURL={webformatURL}
              />
            ))}
          </ul>
          )
        }
        

        {isLoading && <Loader />}

        {(hits.length !== 0 && showButton) && <Button onClick={this.loadMore} />}
      </>
    );
  }
}


// ImageGallery.propTypes = {
//   query: PropTypes.string.isRequired,
// };










