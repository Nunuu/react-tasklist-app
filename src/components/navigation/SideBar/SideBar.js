import React from 'react';

import styles from './SideBar.scss';

import Link from '../../ui/Link/Link';

const sideBar = (props) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.heading}>Sort</div>
      <Link link="/" icon="lnr-alarm2" exact>Days</Link>
      <Link link="/categories" icon="lnr-folder">Categories</Link>
      <Link link="/completed" icon="lnr-file-check">Completed</Link>
    </aside>
  );
}

export default sideBar;