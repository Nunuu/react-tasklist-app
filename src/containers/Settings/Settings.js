import React, { Component } from 'react';

import styles from './Settings.scss';

class Settings extends Component {
  render() {
    return (
      <div className={styles.settings}>
        Allow users to change settings, such as password/username/photo etc.
      </div>
    );
  }
}

export default Settings;