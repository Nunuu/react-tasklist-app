import 'what-input';
import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from './hoc/reactAux/reactAux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import SideBar from './components/navigation/SideBar/SideBar';
import TopBar from './components/navigation/TopBar/TopBar';
import DaysList from './containers/DaysList/DaysList';
import AddTask from './containers/Popups/AddTask/AddTask';
import EditTask from './containers/Popups/EditTask/EditTask';
import DeleteTask from './containers/Popups/DeleteTask/DeleteTask';
import * as actions from './store/actions/';

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

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {
  
  componentDidMount() {
    this.props.onAutoSignin();
  }

  render() {
    let routes = <Route path="/" component={asyncAuth} />
    
    if (this.props.isLoggedIn) {
      routes = <Switch>
        <Route path="/analytics" component={asyncAnalytics} />
        <Route path="/settings" component={asyncSettings} />
        <Route path="/projects" component={asyncProjectList} />
        <Route path="/completed" component={asyncCompletedList} />
        <Route path="/" exact component={DaysList} />
        <Redirect to="/" />
      </Switch>
    }
    
    return (
      <Aux>
        <TopBar isLoggedIn={this.props.isLoggedIn} />
        <SideBar isLoggedIn={this.props.isLoggedIn} />
        <main>
          {routes}
        </main>
        <AddTask />
        <EditTask />
        <DeleteTask />
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignin: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));