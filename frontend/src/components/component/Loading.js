import React from 'react';

import styles from '../css/Loading.module.css';

const Loading = () => {
  return (
    <div className='App-loading-center'>
      <div className={styles.ldsRing}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
