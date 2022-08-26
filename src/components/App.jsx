import { Component } from 'react';



export class App extends Component {
  state = {
    page: 1,
    query: "cat",
    items: [],
  };

  //! Формируем строку URL-запроса:
  API_KEY = '28759369-3882e1068ac26fe18d14affeb';
  BASE_URL = 'https://pixabay.com/api/';
  per_page = 12
  url = `${this.BASE_URL}?key=${this.API_KEY}&q=${this.state.query}&image_type=photo&orientation=horizontal&page=${this.state.page}&per_page=${this.per_page}`; //! with API_KEY
  

  render() {
    console.log(this.url);





    return (
      <header className="searchbar">
        <form className="form">
          <button
            type="submit"
            className="button"
          >
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}












//! OLD ------------------------------------
// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
