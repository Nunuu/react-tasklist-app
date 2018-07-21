import React, { Component } from 'react';

import styles from './ProjectList.scss';

class ProjectList extends Component {
  render() {
    return (
      <div className={styles.projectlist}>
        List tasks by projects.
      </div>
    );
  }
}

export default ProjectList;