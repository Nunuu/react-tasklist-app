import React, { Component } from 'react';

import styles from './DaysList.scss';

import Tasks from '../../components/lists/Tasks/Tasks';

class DaysList extends Component {
  render() {
    const sampleTasks = [
      {
        "id": "123",
        "title": "Make tasks draggable",
        "priority": 0,
        "completed": false
      },
      {
        "id": "121",
        "title": "Allow adding a task",
        "priority": 1,
        "completed": false
      },
      {
        "id": "125",
        "title": "Color code tasks to illustrate priority",
        "priority": 0,
        "completed": true
      },
      {
        "id": "130",
        "title": "Allow task deletion",
        "priority": 1,
        "completed": false
      },
      {
        "id": "131",
        "title": "Allow task search",
        "priority": 2,
        "completed": false
      },
      {
        "id": "135",
        "title": "Allow task edit",
        "priority": 2,
        "completed": false
      }
    ];

    return (
      <div className={styles.dayslist}>
        <Tasks title="Overdue" tasks={sampleTasks} color="rgb(255, 72, 0)" />
        <Tasks title="Today" color="#ff6600" />
        <Tasks title="Tomorrow" color="#ffc000" />
        <Tasks title="Upcoming" color="#00c30e" />
        <Tasks title="Whenever" color="#589aca" />
      </div>
    );
  }
}

export default DaysList;