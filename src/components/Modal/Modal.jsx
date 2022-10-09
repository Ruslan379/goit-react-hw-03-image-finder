import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import css from 'components/Modal/Modal.module.css' 


const modalRoot = document.querySelector('#modal-root');




export class Modal extends Component {
  static propTypes = {
  children: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  };
  
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
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
};

// Modal.propTypes = {
//   children: PropTypes.object.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

