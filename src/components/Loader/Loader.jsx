import React from 'react';
import css from './Loader.module.css';
import PropTypes from 'prop-types';
import { Audio } from 'react-loader-spinner';

export const Loader = ({visible}) => {
  return (
    <div className={css.LoaderWrap}>
  <Audio
  height = "80"
  width = "80"
  radius = "9"
  color = 'green'
  ariaLabel = 'three-dots-loading'     
  visible={visible}
      />
      </div>
  )
}
Loader.propType = {
  visible: PropTypes.bool.isRequired,
}
