import React from 'react';
// import PropTypes from 'prop-types';

import { Audio } from  'react-loader-spinner'





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




// export default Filter;
