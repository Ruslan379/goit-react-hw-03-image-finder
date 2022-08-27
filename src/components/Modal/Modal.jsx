import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import css from 'components/Modal/Modal.module.css' //todo = старый вариант импорта стилей


const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    console.log('Modal componentDidMount');
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    console.log('Modal componentWillUnmount');
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('Нажали ESC, нужно закрыть модалку');

      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    console.log('Кликнули в бекдроп');

    console.log('currentTarget: ', event.currentTarget);
    console.log('target: ', event.target);

    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div
        className={css.Overlay}
        onClick={this.handleBackdropClick}>
          <div className={css.Modal}>
            {this.props.children}
          </div>
      </div>,
      modalRoot,
    );
  }
}








//!OLD ------------------------------------------------------------
// import React from 'react';
// import PropTypes from 'prop-types';

// import css from 'components/Modal/Modal.module.css' //todo = старый вариант импорта стилей




// export const Modal = ({hits}) => (
//   <div className={css.Overlay}>
//     <div className={css.Modal}>
//       <img
//         src={hits[0].largeImageURL}
//         alt=""
//       />
//     </div>
//   </div>
// );


// Modal.propTypes = {
//   hits: PropTypes.array.isRequired,
// };


// // export default Filter;
