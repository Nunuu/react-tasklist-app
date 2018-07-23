import 'what-input';
import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Aux from './hoc/reactAux/reactAux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import SideBar from './components/navigation/SideBar/SideBar';
import TopBar from './containers/TopBar/TopBar';
import DaysList from './containers/DaysList/DaysList';
import AddTask from './containers/Tasks/AddTask/AddTask';

const asyncProjectList = asyncComponent(() => {
  return import('./containers/ProjectList/ProjectList');
});

let lastScrollY = 0;
let ticking = false;

class App extends Component {

  state = {
    shrinkHeader: false
  }

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }
  
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (lastScrollY >= 10) {
          this.setState({shrinkHeader: true});
        } else {
          this.setState({shrinkHeader: false});
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  render() {
    return (
      <Aux>
        <TopBar shrinkHeader={this.state.shrinkHeader} />
        <SideBar shrinkHeader={this.state.shrinkHeader} />
        <main>
          <Switch>
            <Route path="/projects" component={asyncProjectList} />
            <Route path="/" exact component={DaysList} />
            <Redirect to="/" />
          </Switch>
        </main>
        <AddTask />
      </Aux>
    );
  }
}

export default withRouter(App);