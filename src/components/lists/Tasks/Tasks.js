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
    completed={task.completed}
    completionDate={task.completionDate}
    completeTask={() => props.onCompleteTask(task.id)}
    deleteTask={() => props.onDeleteTask(task.id)}
    editTask={() => props.onShowEditForm(task.id)} />
);

const tasks = props => {
  const tasks = props.tasks;
  let taskList = null;
  if (tasks) {
    if (props.draggable) {
      taskList = <Droppable droppableId={props.id}>
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
      <h2 style={{color: props.color}}>{props.title}</h2>
      {props.hideAdd ? null : <Button 
        title="Add Task"
        clicked={() => props.onShowAddForm(props.initDay)}>
        <span className={classNames(icons.lnr, icons["lnr-plus"])}></span>
      </Button>}
      {taskList}
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteTask: (id) => dispatch(actions.deleteTask(id)),
    onShowEditForm: (id) => dispatch(actions.showEditForm(id)),
    onShowAddForm: (initDay) => dispatch(actions.showAddForm(initDay)),
    onCompleteTask: (id) => dispatch(actions.completeTask(id))
  }
}

tasks.propTypes = {
  onCompleteTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
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

export default connect(null, mapDispatchToProps)(tasks);