import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import styles from './DaysList.scss';

import Tasks from '../../components/lists/Tasks/Tasks';
import * as actions from '../../store/actions/';
import Aux from '../../hoc/reactAux/reactAux';
import Loader from '../../components/ui/Loader/Loader';

// const dayFormat = "YYYY-MM-DD HH:mm";
const today = moment().startOf('day');
const tomorrow = moment().startOf('day').add(1, 'd');
const upcoming = moment().startOf('day').add(2, 'd');

class DaysList extends Component {
  
  componentDidMount() {
    this.props.onGetTasks();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.tasks !== this.props.tasks ) {
  //     console.log('component did update!');
  //   }
  // }

  render() {

    const allTasks = this.props.tasks;
    let tasks = <Loader />;
    if (allTasks) {
      // sort all tasks
      const noDate = {};
      const overdueTasks = {};
      Object.keys(allTasks).map(key => {
        const task = allTasks[key];
        if (task.dueDate) {
          overdueTasks[key] = task;
          const diff = today.diff(task.dueDate, 'days');
          console.log('diff:', diff);
        } else {
          noDate[key] = task;
        }
        return task;
      });

      // display tasks
      tasks = <div className={styles.dayslist}>
        <Tasks 
          title="Overdue" 
          color="rgb(255, 72, 0)"
          tasks={overdueTasks}
          disableAdd="true" />
        <Tasks 
          title="Today" 
          color="#ff6600"
          initDay={today} />
        <Tasks 
          title="Tomorrow" 
          color="#ffc000"
          initDay={tomorrow} />
        <Tasks 
          title="Upcoming" 
          color="#00c30e"
          initDay={upcoming} />
        <Tasks 
          title="Whenever" 
          tasks={noDate}
          color="#589aca" />
      </div>
    }
    
    return (
      <Aux>
        {tasks}
      </Aux>
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