import 'what-input';
import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from './hoc/reactAux/reactAux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import SideBar from './components/navigation/SideBar/SideBar';
import TopBar from './components/navigation/TopBar/TopBar';
import DaysList from './containers/DaysList/DaysList';
import * as actions from './store/actions/';

const asyncCategoryList = asyncComponent(() => {
  return import('./containers/CategoryList/CategoryList');
});

class App extends Component {

  addTaskHandler = () => {
    const title = "testing 123";
    const priority = 0;
    const dueDate = new Date();
    this.props.onAddTask(title, priority, dueDate);
  }

  render() {
    return (
      <Aux>
        <TopBar
          numTasks={this.props.numTasks} 
          addTask={this.addTaskHandler} />
        <SideBar />
        <main>
          <Switch>
            <Route path="/categories" component={asyncCategoryList} />
            <Route path="/" exact component={DaysList} />
            <Redirect to="/" />
          </Switch>
        </main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    numTasks: state.count
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddTask: (title, priority, dueDate) => dispatch(actions.addTask(title, priority, dueDate))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));