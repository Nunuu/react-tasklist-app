import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './CompletedList.scss';

import * as actions from '../../store/actions/';
import Tasks from '../../components/lists/Tasks/Tasks';
import Aux from '../../hoc/reactAux/reactAux';
import Loader from '../../components/ui/Loader/Loader';

class CompletedList extends Component {
  
  componentDidMount() {
    this.props.onGetTasks();
  }

  render() {
    let tasks = null;
    if (this.props.loading) {
      tasks = <Loader />;
    } else {
      const allTasks = this.props.tasks;
      // // sort all tasks by completion date
      // const sortedTasks = Object.keys(allTasks)
      //   .sort((a, b) => {
      //     return new Date(allTasks[a].completionDate) - new Date(allTasks[b].completionDate)
      //   })
      //   .reduce((sortedObj, key) => ({
      //     ...sortedObj, 
      //     [key]: allTasks[key]
      //   }), {});

      const tasksArray = [];
      Object.keys(allTasks)
        .sort((a, b) => {
          return new Date(allTasks[a].completionDate) - new Date(allTasks[b].completionDate)
        })
        .map(key => {
          tasksArray.push({
            id: key,
            ...allTasks[key]
          })
        });

      // display the tasks
      tasks = <div className={styles.completedlist}>
        <Tasks 
          title="Completed" 
          color="#00c30e"
          tasks={tasksArray}
          hideAdd="true"
          extraStyle="true" />
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
    onGetTasks: () => dispatch(actions.getCompletedTasks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletedList);