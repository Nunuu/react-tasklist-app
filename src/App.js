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
        if (lastScrollY >= 100) {
          this.setState({shrinkHeader: true});
        } else {
          this.setState({shrinkHeader: false});
        }
        ticking = false;
      });
      ticking = true;
    }
  }

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
          shrinkHeader={this.state.shrinkHeader}
          numTasks={this.props.numTasks} 
          addTask={this.addTaskHandler} />
        <SideBar
          shrinkHeader={this.state.shrinkHeader} />
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