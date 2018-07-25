import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './CompletedList.scss';

import * as actions from '../../store/actions/';
import Tasks from '../../components/lists/Tasks/Tasks';

class CompletedList extends Component {
  
  componentDidMount() {
    this.props.onGetTasks();
  }

  render() {
    return (
      <div className={styles.completedlist}>
        <Tasks 
          title="Completed" 
          color="#00c30e"
          tasks={this.props.tasks} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks.tasks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetTasks: () => dispatch(actions.getCompletedTasks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletedList);