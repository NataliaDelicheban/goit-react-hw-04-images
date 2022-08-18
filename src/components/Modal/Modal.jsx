import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillMount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { children } = this.props;
    const backdropClick = this.handleBackdropClick;

    return createPortal(
        <div className={css.Overlay} onClick={backdropClick}>
        <div className={css.Modal}>{children}</div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propType = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}