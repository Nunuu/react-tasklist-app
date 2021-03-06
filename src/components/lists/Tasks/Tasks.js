import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

import styles from './Tasks.scss';
import icons from '../../../assets/styles/linearicons.scss';

import Task from './Task/Task';
import * as actions from '../../../store/actions/';
import Button from '../../ui/Button/Button';

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#ecf7ff' : 'transparent',
  marginTop: '1em',
  transition: 'background 0.3s ease-out',
  minHeight: '100px'
});

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  margin: '0 0 1em 0',
  ...draggableStyle,
});

const getTask = (task, props) => (
  <Task key={task.id}
    title={task.title}
    priority={task.priority}
    dueDate={props.showDate ? task.dueDate : null}
    project={props.showProject ? (task.project ? props.projects[task.project].title : "") : null}
    completed={task.completed}
    completionDate={task.completionDate}
    completeTask={() => props.onCompleteTask(task.id)}
    unCompleteTask={() => props.onUncompleteTask(task.id)}
    deleteTask={() => props.onShowDeleteConfirm(task.id, task.title)}
    editTask={() => props.onShowEditForm(task.id)} />
);

const tasks = props => {
  const tasks = props.tasks;
  let taskList = null;
  if (tasks) {
    if (props.draggable) {
      taskList = <Droppable droppableId={props.project ? props.project.id : props.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}>
            {tasks.map((task, index) => {
              return <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}>
                    {getTask(task, props)}
                  </div>
                )}
                </Draggable>
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    } else {
      taskList = tasks.map(task => getTask(task, props));
    }
  }
    
  return (
    <div className={classNames(
      styles.taskBlock, 
      props.extraStyle ? styles[props.extraStyle] : ''
    )}>
      <h2 style={{color: props.color}}>
        {props.project ? props.project.title : props.title}
      </h2>
      {props.addProject ? <Button 
        clicked={props.onShowProjectAddForm} 
        title="Add Project">
          <span className={classNames(icons.lnr, icons['lnr-folder-plus'])}></span>
        </Button> : null}
      {props.hideAdd ? null : <Button 
        title="Add Task"
        clicked={() => props.onShowAddForm(props.initDay, props.project ? props.project.id : "")}>
        <span className={classNames(icons.lnr, icons["lnr-plus"])}></span>
      </Button>}
      {taskList}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    projects: state.projects.projects
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onShowDeleteConfirm: (id, title) => dispatch(actions.showDeleteConfirm(id, title)),
    onShowEditForm: (id) => dispatch(actions.showEditForm(id)),
    onShowAddForm: (initDay, project) => dispatch(actions.showAddForm(initDay, project)),
    onCompleteTask: (id) => dispatch(actions.completeTask(id)),
    onUncompleteTask: (id) => dispatch(actions.uncompleteTask(id))
  }
}

tasks.propTypes = {
  onCompleteTask: PropTypes.func.isRequired,
  onUncompleteTask: PropTypes.func.isRequired,
  onShowDeleteConfirm: PropTypes.func.isRequired,
  onShowEditForm: PropTypes.func.isRequired,
  tasks: PropTypes.array,
  draggable: PropTypes.bool,
  id: PropTypes.string,
  extraStyle: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  hideAdd: PropTypes.bool,
  initDay: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date), PropTypes.object])
};

export default connect(mapStateToProps, mapDispatchToProps)(tasks);