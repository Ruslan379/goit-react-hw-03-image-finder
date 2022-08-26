import { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export class App extends Component {
  state = {
    page: 1,
    query: '',
    hits: [],
    isLoading: false,
    error: false,
  };



  //! Формируем строку URL-запроса:
  API_KEY = '28759369-3882e1068ac26fe18d14affeb';
  BASE_URL = 'https://pixabay.com/api/';
  per_page = 12;
  // url = `${this.BASE_URL}?key=${this.API_KEY}&q=${this.state.query}&image_type=photo&orientation=horizontal&page=${this.state.page}&per_page=${this.per_page}`; //! with API_KEY
  


//* ================================ МЕТОДЫ ==========================================================
  //! axios.get-запрос: (с async/await)
  async fetchHits() {
    try { 
    console.log(this.state.query); //!
    const url = `${this.BASE_URL}?key=${this.API_KEY}&q=${this.state.query}&image_type=photo&orientation=horizontal&page=${this.state.page}&per_page=${this.per_page}`; 
    console.log("fetchHits: ", url); //!
    const response = await axios.get(url);
    // const newHits = await response.data;
    // const { hits } = newHits;
    // console.log(hits); //!
    // return hits;
      
      //?  Прверка hits на пустой массив:
      // console.log("response.data.total: ", response.data.total); //!
      // if (!response.data.total) {
      //   toast.warning('Нет такой темы'); 
      //   this.setState ({
      //     page: 1,
      //     query: '',
      //     hits: [],
      //   });
      //   return;
      // }

    return response.data;
      } catch (error) { 
        this.setState({ error: true, isLoading: false }); 
        console.log(error); 
    } 
  };
  
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


  //? --------------------------------------------------------
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



  async componentDidUpdate(_, prevState) {
    try { 
      console.log("prevState.page: ", prevState.page); //!
      console.log("this.state.page: ", this.state.page); //!
    
      console.log("prevState.query: ", prevState.query); //!
      console.log("this.state.query: ", this.state.query); //!
      
      if (
        prevState.page !== this.state.page ||
        prevState.query !== this.state.query
      ) {
        this.setState({ isLoading: true })
        // console.log("componentDidUpdate: ", this.url); //!
        const { hits } = await this.fetchHits();
        //!  Прверка hits на пустой массив:
        console.log("fetch hits[0]: ", hits[0]); //! //!
        if (hits[0] === undefined) {
          toast.warning('Нет такой темы'); 
          this.setState ({
            page: 1,
            query: '',
            hits: [],
          });
          return;
        };
        this.setState({ hits, isLoading: false });
          console.log("fetch hits: ", hits); //!
          console.log("fetch hits[0]: ", hits[0]); //!
          console.log("fetch hits[0].id: ", hits[0].id); //!
          console.log("fetch hits[0].webformatURL: ", hits[0].webformatURL); //!
          console.log("fetch hits[0].largeImageURL: ", hits[0].largeImageURL); //!
      }
    } catch (error) { 
      this.setState({ error: true, isLoading: false }); 
      console.log(error); 
      } 
  }



  handleSubmit = event => {
    event.preventDefault();
    // console.log(event.target.elements.query.value); //!

    if (event.target.elements.query.value === '') {
      toast.error('Поле не должно быть пустым'); 
      return;
    };

    this.setState ({
      page: 1,
      query: event.target.elements.query.value,
      hits: [],
    });
    event.target.reset()
    // this.props.onSubmit(name, number);
    // this.reset();
  };



  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  }
  




//* ================================ RENDER ==========================================================
  render() {
    const { hits } = this.state
    // console.log(this.url); //!
    console.log("render hits: ", hits); //!
    // console.log("render hits[0]: ", hits[0]); //!
    // console.log("render hits[0].id: ", hits[0].id); //!
    
    // console.log("this.state.hits: ", this.state.hits); //!
    // console.log("this.state.hits[0]: ", this.state.hits[0]); //!
    // console.log("this.state.hits[0].id: ", this.state.hits[0].id); //!

    return (
      
        // <Searchbar/> 
        <header className="searchbar">
        <ToastContainer autoClose={1000} theme={"colored"} />
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
            // onChange={this.handleChange}
          />
          <br />
          <button
            type="button"
            className="button"
            onClick={this.loadMore}
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
