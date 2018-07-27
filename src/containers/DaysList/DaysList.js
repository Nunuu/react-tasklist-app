import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import styles from './DaysList.scss';

import Tasks from '../../components/lists/Tasks/Tasks';
import * as actions from '../../store/actions/';
import Aux from '../../hoc/reactAux/reactAux';
import Loader from '../../components/ui/Loader/Loader';

const today = moment().startOf('day');
const tomorrow = moment().startOf('day').add(1, 'd');
const upcoming = moment().startOf('day').add(2, 'd');

class DaysList extends Component {
  
  componentDidMount() {
    this.props.onGetTasks();
  }

  render() {
    let tasks = null;
    if (this.props.loading) {
      tasks = <Loader />;
    } else {
      const allTasks = this.props.tasks;
      // sort all tasks into proper arrays
      const noDate = [];
      const overdueTasks = [];
      const todayTasks = [];
      const tmrTasks = [];
      const upcomingTasks = [];
      Object.keys(allTasks)
        .sort((a, b) => allTasks[a].order - allTasks[b].order)
        .map(key => {
          const task = allTasks[key];
          const newTaskObject = {
            id: key,
            ...task
          }
          if (task.dueDate && task.dueDate.length) {
            const diff = today.diff(task.dueDate[0], 'days');
            if (diff === 0) {
              todayTasks.push(newTaskObject);
            } else if (diff === -1) {
              tmrTasks.push(newTaskObject);
            } else if (diff > 0) {
              overdueTasks.push(newTaskObject);
            } else {
              upcomingTasks.push(newTaskObject);
            }
          } else {
            noDate.push(newTaskObject);
          }
          return task;
        });

      // check if there are any overdue tasks
      let overdueTaskList = null;
      if (overdueTasks.length > 0) {
        overdueTaskList = <Tasks 
          title="Overdue" 
          color="rgb(255, 72, 0)"
          tasks={overdueTasks}
          hideAdd="true" />
      }

      // display tasks
      tasks = <div className={styles.dayslist}>
        {overdueTaskList}
        <Tasks 
          title="Today" 
          color="#ff6600"
          initDay={today}
          tasks={todayTasks} />
        <Tasks 
          title="Tomorrow" 
          color="#ffc000"
          initDay={tomorrow}
          tasks={tmrTasks} />
        <Tasks 
          title="Upcoming" 
          color="#00c30e"
          initDay={upcoming}
          tasks={upcomingTasks} />
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
    tasks: state.tasks.tasks,
    loading: state.tasks.loadingData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetTasks: () => dispatch(actions.getTasks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DaysList);