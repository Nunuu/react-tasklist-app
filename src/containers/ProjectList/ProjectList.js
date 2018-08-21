import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import styles from './ProjectList.scss';

import Aux from '../../hoc/reactAux/reactAux';
import Loader from '../../components/ui/Loader/Loader';
import Tasks from '../../components/lists/Tasks/Tasks';
import * as actions from '../../store/actions/';
import icons from '../../assets/styles/linearicons.scss';
import Button from '../../components/ui/Button/Button';
import AddProject from '../Popups/Projects/AddProject';

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
      const noProjectTasks = Object.keys(allTasks)
        .sort((a, b) => allTasks[a].order - allTasks[b].order)
        .map(key => {
          return {
            id: key,
            ...allTasks[key]
          }
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
        <h1>Projects</h1>
        <div className="buttons">
          <Button clicked={this.props.onShowProjectAddForm} title="Add Project">
            <span className={classNames(icons.lnr, icons['lnr-folder-plus'])}></span>
          </Button>
        </div>
        {tasks}
        <AddProject />
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks.tasks,
    loading: state.projects.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetTasks: () => dispatch(actions.getTasks()),
    onShowProjectAddForm: () => dispatch(actions.showProjectAddForm())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);