import { Component } from 'react';
// import axios from 'axios';

import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { Audio } from  'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// import css from 'components/Searchbar/Searchbar.module.css' //todo = старый вариант импорта стилей



export class Searchbar extends Component {
  state = {
    // page: 1,
    query: '',
    // hits: [],
    // isLoading: false,
    // error: false,
  };



  //! Формируем строку URL-запроса:
  // API_KEY = '28759369-3882e1068ac26fe18d14affeb';
  // BASE_URL = 'https://pixabay.com/api/';
  // per_page = 12;
  // url = `${this.BASE_URL}?key=${this.API_KEY}&q=${this.state.query}&image_type=photo&orientation=horizontal&page=${this.state.page}&per_page=${this.per_page}`; //! with API_KEY
  


//* ================================ МЕТОДЫ ==========================================================
  


  //! Запись в state значения поля инпут
  handleChange = event => {
    // console.log("handleChange - event.currentTarget.value: ", event.currentTarget.value); //!

    //? Проверка на пустое поле инпута --> тут НЕ ПРАВИЛЬНО РАБОТАЕТ !!!
    // if (event.currentTarget.value.trim() === '') {
    //   toast.error('Поле не должно быть пустым'); 
    //   return;
    // };

    this.setState({ query: event.currentTarget.value.toLowerCase() });

  };




  //! Передача пропса this.state.query в App
  handleSubmit = event => {
    event.preventDefault();
    // console.log("handleSubmit - event.target.elements.query.value: ", event.target.elements.query.value); //!

    //! Проверка на пустое поле инпута
    if (event.target.elements.query.value.trim() === '') {
      toast.error('Поле не должно быть пустым');
      event.target.reset()
      return;
    };

    // console.log("handleSubmit - this.state.query: ", this.state.query); //!
    
    this.props.onSubmit(this.state.query);

    // this.setState ({query: ""});
    event.target.reset()
  };



  
  




//* ================================ RENDER ==========================================================
  render() {
    

    return (
      
        <header className="searchbar">
        <form
          className="form"
          onSubmit={this.handleSubmit}
        >
          <button
            type="submit"
            className="button"
          >
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            name = "query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />     
        </form>  
      </header>
    );
  }
}
