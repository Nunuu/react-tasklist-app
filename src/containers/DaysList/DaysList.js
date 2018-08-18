import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { DragDropContext } from 'react-beautiful-dnd';

import styles from './DaysList.scss';

import Tasks from '../../components/lists/Tasks/Tasks';
import * as actions from '../../store/actions/';
import Aux from '../../hoc/reactAux/reactAux';
import Loader from '../../components/ui/Loader/Loader';
import { reorder, move } from '../../shared/helpers';

let noDateTasks = [];
let overdueTasks = [];
let todayTasks = [];
let tmrTasks = [];
let upcomingTasks = [];

const today = moment().startOf('day');
const overdue = today.clone().subtract(2, 'd');
const tomorrow = today.clone().add(1, 'd');
const upcoming = today.clone().add(2, 'd');

class DaysList extends Component {
  
  constructor(props) {
    super(props);

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    this.props.onGetTasks();
  }

  getList(id) {
    switch (id) {
      case "overdueTasks": return {
        tasks: overdueTasks, 
        date: overdue
      };
      case "todayTasks": return {
        tasks: todayTasks, 
        date: today
      };
      case "tmrTasks": return {
        tasks: tmrTasks, 
        date: tomorrow
      };
      case "upcomingTasks": return {
        tasks: upcomingTasks, 
        date: upcoming
      };
      case "noDateTasks": return {
        tasks: noDateTasks, 
        date: null
      };
      default: return  {
        tasks: noDateTasks, 
        date: null
      };
    }
  }

  onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) { return; }

    let tasks = [];
    if (source.droppableId === destination.droppableId) {
      tasks = reorder(
        this.getList(source.droppableId).tasks,
        result.source.index,
        result.destination.index
      );
    } else {
      tasks = move(
        this.getList(source.droppableId).tasks,
        this.getList(destination.droppableId),
        source,
        destination
      );
    }
    this.props.onReorderList(tasks);
  }

  render() {
    let tasks = null;
    if (this.props.loading) {
      tasks = <Loader />;
    } else {
      const allTasks = this.props.tasks;
      noDateTasks = [];
      overdueTasks = [];
      todayTasks = [];
      tmrTasks = [];
      upcomingTasks = [];
      // sort all tasks into proper arrays
      Object.keys(allTasks)
        .sort((a, b) => allTasks[a].order - allTasks[b].order)
        .forEach(key => {
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
            noDateTasks.push(newTaskObject);
          }
        });

      // check if there are any overdue tasks
      let overdueTaskList = null;
      let extraStyle = 'reducedCol';
      if (overdueTasks.length > 0) {
        overdueTaskList = <Tasks 
          title="Overdue" 
          color="rgb(255, 72, 0)"
          tasks={overdueTasks}
          hideAdd
          id="overdueTasks"
          draggable />
        extraStyle = '';
      }

      // display tasks
      tasks = <div className={styles.dayslist}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {overdueTaskList}
          <Tasks 
            title="Today" 
            color="#ff6600"
            initDay={today}
            tasks={todayTasks}
            extraStyle={extraStyle}
            id="todayTasks"
            draggable />
          <Tasks 
            title="Tomorrow" 
            color="#ffc000"
            initDay={tomorrow}
            tasks={tmrTasks}
            extraStyle={extraStyle}
            id="tmrTasks"
            draggable />
          <Tasks 
            title="Upcoming" 
            color="#00c30e"
            initDay={upcoming}
            tasks={upcomingTasks}
            extraStyle={extraStyle}
            id="upcomingTasks"
            draggable />
          <Tasks 
            title="Whenever" 
            tasks={noDateTasks}
            color="#589aca"
            extraStyle={extraStyle}
            id="noDateTasks"
            draggable />
        </DragDropContext>
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
    onGetTasks: () => dispatch(actions.getTasks()),
    onReorderList: (tasksArray) => dispatch(actions.rearrangeTasks(tasksArray))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DaysList);