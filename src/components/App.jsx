import { Component } from 'react';
import axios from 'axios';



export class App extends Component {
  state = {
    page: 1,
    query: "cat",
    hits: [],
    loading: false,
  };



  //! Формируем строку URL-запроса:
  API_KEY = '28759369-3882e1068ac26fe18d14affeb';
  BASE_URL = 'https://pixabay.com/api/';
  per_page = 12;
  url = `${this.BASE_URL}?key=${this.API_KEY}&q=${this.state.query}&image_type=photo&orientation=horizontal&page=${this.state.page}&per_page=${this.per_page}`; //! with API_KEY
  


//* ================================ МЕТОДЫ ==========================================================
  //! axios.get-запрос: (с async/await)
  async fetchHits(url) {
    const response = await axios.get(url);
    const newHits = await response.data;
    // console.log("newHits: ", newHits); //!
    // const { totalHits, hits } = newHits; //?
    const { hits } = newHits;
    // const all = { totalHits, hits } //?
    return hits;
  };
  
  
  componentDidMount() {
    this.setState({ loading: true })
    setTimeout(() => {
      this.fetchHits(this.url)
        .then(( hits ) => {
            // console.log("totalHits: ", totalHits); //!
          console.log("fetch hits: ", hits); //!
          console.log("fetch hits[0]: ", hits[0]); //!
          console.log("fetch hits[0].id: ", hits[0].id); //!
          console.log("fetch hits[0].webformatURL: ", hits[0].webformatURL); //!
          console.log("fetch hits[0].largeImageURL: ", hits[0].largeImageURL); //!
        return hits
        })  
        // .then(res => res.json()) //? old
        // .then(console.log) //!
        .then(hits => this.setState({ hits })) 
        .finally(() => this.setState({ loading: false }));
    }, 2000);
  }



  
  

  





  
//* ================================ RENDER ==========================================================
  render() {
    const { hits } = this.state
    // console.log(this.url); //!
    console.log("hits: ", hits); //!
    console.log("hits[0]: ", hits[0]); //!
    // console.log("hits[0].id: ", hits[0].id); //!
    
    console.log("this.state.hits: ", this.state.hits); //!
    console.log("this.state.hits[0]: ", this.state.hits[0]); //!
    // console.log("this.state.hits[0].id: ", this.state.hits[0].id); //!

    return (
      // <Searchbar/>
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
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <br />
          <button
            type="button"
            className="button"
          >
            Load more
          </button>
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
