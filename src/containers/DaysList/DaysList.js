import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './DaysList.scss';

import Tasks from '../../components/lists/Tasks/Tasks';
import * as actions from '../../store/actions/';

class DaysList extends Component {
  
  componentDidMount() {
    this.props.onGetTasks();
  }

  render() {
    
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
      <div className={styles.dayslist}>
        <Tasks 
          title="Overdue" 
          color="rgb(255, 72, 0)"
          tasks={this.props.tasks}
          initDay={today} />
        <Tasks 
          title="Today" 
          color="#ff6600"
          initDay={today} />
        <Tasks 
          title="Tomorrow" 
          color="#ffc000"
          initDay={today} />
        <Tasks 
          title="Upcoming" 
          color="#00c30e"
          initDay={today} />
        <Tasks 
          title="Whenever" 
          color="#589aca" />
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
    onGetTasks: () => dispatch(actions.getTasks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DaysList);