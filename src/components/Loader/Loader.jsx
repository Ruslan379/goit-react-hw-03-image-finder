import React from 'react';
// import PropTypes from 'prop-types';

import { Audio } from  'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// import css from 'components/Button/Button.module.css' //todo = старый вариант импорта стилей




export const Loader = () => (
  <h1 style={{ margin: '0 auto' }}>
    Загружаем...
      <Audio
        // height = "80"
        // // width = "80"
        width = "100%"
        // radius = "9"
        // color = 'green'
        // ariaLabel = 'three-dots-loading'     
        // wrapperStyle
        // wrapperClass
      />
  </h1>
);


// Button.propTypes = {
//   onClick: PropTypes.func.isRequired,
// };



// export default Filter;
