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
    this.props.onGetProjects();
    this.props.onGetTasks();
  }

  render() {
    let tasks = null;
    if (this.props.loading) {
      tasks = <Loader />;
    } else {
      const allProjects = this.props.projects;
      const allTasks = this.props.tasks;
      
      const taskContainers = Object.keys(allProjects)
        .sort((a, b) => allProjects[a].order - allProjects[b].order)
        .map(projectKey => {
          const sortedTasks = Object.keys(allTasks)
            .filter(taskKey => projectKey === allTasks[taskKey].project)
            .map(taskKey => {
              return {
                id: taskKey,
                ...allTasks[taskKey]
              }
            });
          
          const projectName = allProjects[projectKey].title

          return <Tasks 
            key={projectKey}
            // project={{
            //   id: projectKey,
            //   title: allProjects[projectKey].title
            // }}
            title={projectName}
            color="#000000"
            tasks={sortedTasks}
            id={projectKey} />
        });

      const noProjectTasks = Object.keys(allTasks)
        .filter(taskKey => !allTasks[taskKey].project)
        .map(taskKey => {
          return {
            id: taskKey,
            ...allTasks[taskKey]
          }
        });
      taskContainers.push(
        <Tasks 
          key="uncategorized"
          title="Uncategorized"
          color="#000000"
          tasks={noProjectTasks}
          id="uncategorized" />
      );

      tasks = <div className={styles.projectlist}>
        {taskContainers}
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
    projects: state.projects.projects,
    tasks: state.tasks.tasks,
    loading: state.projects.loading && state.tasks.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetProjects: () => dispatch(actions.getProjects()),
    onGetTasks: () => dispatch(actions.getTasks()),
    onShowProjectAddForm: () => dispatch(actions.showProjectAddForm())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);