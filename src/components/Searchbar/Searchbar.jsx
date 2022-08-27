import { Component } from 'react';
// import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';

import { toast } from 'react-toastify';

import css from 'components/Searchbar/Searchbar.module.css' //todo = старый вариант импорта стилей



export class Searchbar extends Component {
  state = {
    query: '',
  };


//* ================================ МЕТОДЫ ==========================================================
  


  //! Запись в state значения поля инпут
  handleChange = event => {
    // console.log("handleChange - event.currentTarget.value: ", event.currentTarget.value); //!

    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };




  //! Передача пропса this.state.query в App
  handleSubmit = event => {
    event.preventDefault();
    // console.log("handleSubmit - event.target.elements.query.value: ", event.target.elements.query.value); //!

    //! Проверка на пустое поле инпута
    // if (this.state.query.trim() === '') { //? или так, но не совсем правильно работает
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
      
        <header className={css.Searchbar}>
        <form
          className={css.SearchForm}
          onSubmit={this.handleSubmit}
        >
          <button
            type="submit"
            className={css.SearchFormButton}
            
          >
            <ImSearch style={{ marginRight: 8 }} />
            <span className={css.SearchFormButtonLabel1}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
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