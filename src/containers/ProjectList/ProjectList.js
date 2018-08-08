import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './ProjectList.scss';

import Aux from '../../hoc/reactAux/reactAux';
import Loader from '../../components/ui/Loader/Loader';
import Tasks from '../../components/lists/Tasks/Tasks';
import * as actions from '../../store/actions/';

class ProjectList extends Component {
  
  // constructor(props) {
  //   super(props);

  //   this.onDragEnd = this.onDragEnd.bind(this);
  // }

  componentDidMount() {
    this.props.onGetTasks();
  }

  render() {
    let tasks = null;
    if (this.props.loading) {
      tasks = <Loader />;
    } else {
      const allTasks = this.props.tasks;
      const noProjectTasks = [];
      Object.keys(allTasks)
        .sort((a, b) => allTasks[a].order - allTasks[b].order)
        .forEach(key => {
          const task = allTasks[key];
          const newTaskObject = {
            id: key,
            ...task
          }
          noProjectTasks.push(newTaskObject);
        });
      tasks = <div className={styles.projectlist}>
        <Tasks 
          title="Uncategorized" 
          color="#ff6600"
          tasks={noProjectTasks}
          id="uncategorized" />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);