import 'what-input';
import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Aux from './hoc/reactAux/reactAux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import SideBar from './components/navigation/SideBar/SideBar';
import TopBar from './components/navigation/TopBar/TopBar';
import DaysList from './containers/DaysList/DaysList';
import AddTask from './containers/Tasks/AddTask/AddTask';
import EditTask from './containers/Tasks/EditTask/EditTask';

const asyncAnalytics = asyncComponent(() => {
  return import('./containers/Analytics/Analytics');
});

const asyncSettings = asyncComponent(() => {
  return import('./containers/Settings/Settings');
});

const asyncProjectList = asyncComponent(() => {
  return import('./containers/ProjectList/ProjectList');
});

const asyncCompletedList = asyncComponent(() => {
  return import('./containers/CompletedList/CompletedList');
});

class App extends Component {
  render() {
    return (
      <Aux>
        <TopBar />
        <SideBar />
        <main>
          <Switch>
            <Route path="/analytics" component={asyncAnalytics} />
            <Route path="/settings" component={asyncSettings} />
            <Route path="/projects" component={asyncProjectList} />
            <Route path="/completed" component={asyncCompletedList} />
            <Route path="/" exact component={DaysList} />
            <Redirect to="/" />
          </Switch>
        </main>
        <AddTask />
        <EditTask />
      </Aux>
    );
  }
}

export default withRouter(App);