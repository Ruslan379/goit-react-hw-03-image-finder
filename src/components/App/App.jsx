import { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

import css from 'components/App/App.module.css' 



export class App extends Component {
  state = {
    query: '',
  };


  //! Передача пропса this.state.query из Searchbar
  handleFormSubmit = (query) => {
    this.setState ({
      query,
    });
  };



  render() {
    const { query } = this.state

    return (
      <div className={css.App}>

        <ToastContainer autoClose={1500} theme={"colored"} />
        
        <Searchbar
          onSubmit={this.handleFormSubmit}
        />

        <ImageGallery
          query={query} 
        />
        
      </div>
    );
  }
}
