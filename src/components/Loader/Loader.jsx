import React from 'react';
// import PropTypes from 'prop-types';

import { Audio } from  'react-loader-spinner'



export const Loader = () => (
  <h1 style={{ margin: '0 auto' }}>
    Загружаем...
      <Audio width = "100%" />
  </h1>
);



// export default Filter;
