import React from 'react';

import styles from './Loader.scss';

const loader = props => (
  <div className={styles.loader}>
    <div className={styles.graphic}></div>
    <p>Loading</p>
  </div>
);

export default loader;