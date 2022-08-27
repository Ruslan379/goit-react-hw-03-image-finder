import React from 'react';
import PropTypes from 'prop-types';

// import 'components/Filter/Filter.css';
import css from 'components/Button/Button.module.css' //todo = старый вариант импорта стилей




export const Button = ({ onClick }) => (
  <button
    type="button"
    className="button"
    onClick={onClick}
  >
    Load more
  </button>
);


Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};



// export default Filter;
