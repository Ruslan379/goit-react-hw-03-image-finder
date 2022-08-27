import React from 'react';
import PropTypes from 'prop-types';

import css from 'components/Modal/Modal.module.css' //todo = старый вариант импорта стилей




export const Modal = ({ hits }) => (
  <div className={css.Overlay}>
    <div className={css.Modal}>
      <img
        // src=""
        src={hits[0].largeImageURL}
        alt=""
      />
    </div>
  </div>
);


Modal.propTypes = {
  hits: PropTypes.array.isRequired,
};



// export default Filter;
