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

class Tasks extends Component {

  constructor(props) {
    super(props);

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    if (!result.destination) { return; }

    // const id = result.draggableId;
    // const endIndex = result.destination.index;
    
    // const tasks = this.props.tasks;
    // const newTasks = {};
    // Object.keys(tasks).map((key, index) => {
    //   if (key !== id || index === endIndex) {
    //     newTasks[key] = updateObject(tasks[key]
    //   }
    // });

    // console.log("old", tasks);
    // console.log("new", newTasks);
    
    this.props.onReorderList(result.draggableId, result.destination.index);
  }

  render() {
    const tasks = this.props.tasks;
    let taskList = null;
    if (tasks) {
      taskList = Object.keys(tasks).map((key, index) => {
        return <Draggable key={key} draggableId={key} index={index}>
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
              order={tasks[key].order}
              title={tasks[key].title}
              priority={tasks[key].priority}
              completed={tasks[key].completed}
              completionDate={tasks[key].completionDate}
              completeTask={() => this.props.onCompleteTask(key)}
              deleteTask={() => this.props.onDeleteTask(key)}
              editTask={() => this.props.onShowEditForm(key)} />
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