import React, {Component} from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import styles from './Tasks.scss';
import icons from '../../../assets/styles/linearicons.scss';

import Task from './Task/Task';
import * as actions from '../../../store/actions/';
import Button from '../../ui/Button/Button';

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#ecf7ff' : 'transparent',
  marginTop: '1em',
  transition: 'background 0.3s ease-out'
});

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  margin: '0 0 1em 0',
  ...draggableStyle,
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class Tasks extends Component {

  constructor(props) {
    super(props);

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    if (!result.destination) { return; }

    const tasks = reorder(
      this.props.tasks,
      result.source.index,
      result.destination.index
    );
    
    tasks.forEach((task, index) => {
      this.props.onReorderList(task.id, index);
    });
  }

  render() {
    const tasks = this.props.tasks;
    let taskList = null;
    if (tasks) {
      taskList = tasks.map((task, index) => {
        return <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
            >
            <Task 
              order={task.order}
              title={task.title}
              priority={task.priority}
              completed={task.completed}
              completionDate={task.completionDate}
              completeTask={() => this.props.onCompleteTask(task.id)}
              deleteTask={() => this.props.onDeleteTask(task.id)}
              editTask={() => this.props.onShowEditForm(task.id)} />
            </div>
          )}
          </Draggable>
      });
    }
  
    let addButton = null;
    if (!this.props.hideAdd) {
      addButton = <Button 
        clicked={() => this.props.onShowAddForm(this.props.initDay)}>
        <span className={classNames(icons.lnr, icons["lnr-plus"])}></span>
      </Button>
    }
      
    return (
      <div className={classNames(styles.taskBlock, this.props.extraStyle ? styles.singleCol : '')}>
        <h2 style={{color: this.props.color}}>{this.props.title}</h2>
        {addButton}
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}>
                {taskList}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteTask: (id) => dispatch(actions.deleteTask(id)),
    onShowEditForm: (id) => dispatch(actions.showEditForm(id)),
    onShowAddForm: (initDay) => dispatch(actions.showAddForm(initDay)),
    onCompleteTask: (id) => dispatch(actions.completeTask(id)),
    onReorderList: (id, order) => dispatch(actions.rearrangeTask(id, order))
  }
}

export default connect(null, mapDispatchToProps)(Tasks);