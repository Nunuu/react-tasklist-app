import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

import styles from './ProjectList.scss';

import Aux from '../../hoc/reactAux/reactAux';
import Loader from '../../components/ui/Loader/Loader';
import Tasks from '../../components/lists/Tasks/Tasks';
import * as actions from '../../store/actions/';
import AddProject from '../Popups/Projects/AddProject';
import { reorder, move } from '../../shared/helpers';

let allProjects;

class ProjectList extends Component {

  constructor(props) {
    super(props);

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    if (Object.keys(this.props.tasks).length && Object.keys(this.props.projects).length) { return; }

    this.props.onGetProjects();
    this.props.onGetTasks();
  }

  onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) { return; }

    let tasks = [];
    const droppableId = source.droppableId;
    const destId = destination.droppableId;
    if (droppableId === destId) {
      tasks = reorder(
        allProjects[droppableId].tasks,
        result.source.index,
        result.destination.index
      );
    } else {
      tasks = move(
        allProjects[droppableId].tasks,
        allProjects[destId],
        source,
        destination,
        destId === "uncategorized" ? "" : destId
      );
    }
    this.props.onReorderList(tasks);
  }

  render() {
    let tasks = null;
    if (this.props.loading) {
      tasks = <Loader />;
    } else {
      allProjects = Object.assign({}, this.props.projects);
      const allTasks = this.props.tasks;
      const projectKeys = Object.keys(allProjects);
      
      let extraStyle = projectKeys.length > 2 ? '' : 'reducedCol';

      // get all the tasks that are assigned to a project
      const taskContainers = projectKeys
        .sort((a, b) => allProjects[a].order - allProjects[b].order)
        .map(projectKey => {
          // get tasks that belongs to the project
          const sortedTasks = Object.keys(allTasks)
            .sort((a, b) => allTasks[a].projectSort - allTasks[b].projectSort)
            .filter(taskKey => projectKey === allTasks[taskKey].project)
            .map(taskKey => {
              return {
                id: taskKey,
                ...allTasks[taskKey]
              }
            });
          // store the tasks
          allProjects[projectKey].tasks = sortedTasks;
          // return the jsx
          return <Tasks 
            key={projectKey}
            project={{
              id: projectKey,
              title: allProjects[projectKey].title
            }}
            color="#589aca"
            tasks={sortedTasks}
            extraStyle={extraStyle}
            draggable
            showDate />
        });
      
      // get all the tasks that are not assigned to a project
      const noProjectTasks = Object.keys(allTasks)
        .sort((a, b) => allTasks[a].projectSort - allTasks[b].projectSort)
        .filter(taskKey => allTasks[taskKey].project === "")
        .map(taskKey => {
          return {
            id: taskKey,
            ...allTasks[taskKey]
          }
        });
      if (noProjectTasks.length > 0) {
        allProjects.uncategorized = {};
        allProjects.uncategorized.tasks = noProjectTasks;
        taskContainers.push(
          <Tasks 
            key="uncategorized"
            title="Uncategorized"
            color="#ffc000"
            tasks={noProjectTasks}
            id="uncategorized"
            extraStyle={extraStyle}
            draggable
            showDate />
        );
      }

      // empty list to add new project
      taskContainers.push(
        <Tasks 
          key="empty"
          id="empty"
          title="New Project"
          color="#00c30e"
          hideAdd
          addProject
          extraStyle={extraStyle}
          onShowProjectAddForm={this.props.onShowProjectAddForm} />
      );

      // display all the tasks
      tasks = <div className={styles.projectlist}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {taskContainers}
        </DragDropContext>
      </div>
    }

    return (
      <Aux>
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
    onShowProjectAddForm: () => dispatch(actions.showProjectAddForm()),
    onReorderList: (tasksArray) => dispatch(actions.rearrangeTasks(tasksArray, true))
  }
}

ProjectList.propTypes = {
  onGetProjects: PropTypes.func.isRequired,
  onGetTasks: PropTypes.func.isRequired,
  onShowProjectAddForm: PropTypes.func.isRequired,
  onReorderList: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  tasks: PropTypes.object,
  projects: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);