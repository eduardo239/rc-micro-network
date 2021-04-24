import React from 'react';

import styles from '../css/PM.module.css';

import User from './User';

const PM = () => {
  return (
    <div className='App-modal-container'>
      <div className={styles.Modal}>
        <User />
        <div>
          <input type='text' />
          <button className='App-btn App-btn-secondary'>send</button>
        </div>
      </div>
    </div>
  );
};

export default PM;
