import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import styles from './ProjectList.scss';

import Aux from '../../hoc/reactAux/reactAux';
import Loader from '../../components/ui/Loader/Loader';
import Tasks from '../../components/lists/Tasks/Tasks';
import * as actions from '../../store/actions/';
import AddProject from '../Popups/Projects/AddProject';

class ProjectList extends Component {
  
  constructor(props) {
    super(props);

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    this.props.onGetProjects();
    this.props.onGetTasks();
  }

  onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) { return; }

    // let tasks = [];
    // if (source.droppableId === destination.droppableId) {
    //   tasks = reorder(
    //     this.getList(source.droppableId).tasks,
    //     result.source.index,
    //     result.destination.index
    //   );
    // } else {
    //   tasks = move(
    //     this.getList(source.droppableId).tasks,
    //     this.getList(destination.droppableId),
    //     source,
    //     destination
    //   );
    // }
    // this.props.onReorderList(tasks);
  }

  render() {
    let tasks = null;
    if (this.props.loading) {
      tasks = <Loader />;
    } else {
      const allProjects = this.props.projects;
      const allTasks = this.props.tasks;
      
      const taskContainers = Object.keys(allProjects)
        .sort((a, b) => allProjects[a].projectSort - allProjects[b].projectSort)
        .map(projectKey => {
          const sortedTasks = Object.keys(allTasks)
            .filter(taskKey => projectKey === allTasks[taskKey].project)
            .map(taskKey => {
              return {
                id: taskKey,
                ...allTasks[taskKey]
              }
            });
          
          return <Tasks 
            key={projectKey}
            project={{
              id: projectKey,
              title: allProjects[projectKey].title
            }}
            color="#589aca"
            tasks={sortedTasks}
            draggable />
        });

      const noProjectTasks = Object.keys(allTasks)
        .filter(taskKey => allTasks[taskKey].project === "")
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
          color="#589aca"
          tasks={noProjectTasks}
          id="uncategorized"
          draggable />
      );

      taskContainers.unshift(
        <Tasks 
          key="empty"
          id="empty"
          title="New Project"
          color="#000000"
          hideAdd
          addProject
          onShowProjectAddForm={this.props.onShowProjectAddForm} />
      );

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
    onShowProjectAddForm: () => dispatch(actions.showProjectAddForm())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);