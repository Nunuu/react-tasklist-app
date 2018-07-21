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
import Popup from './components/ui/Popup/Popup';

const asyncProjectList = asyncComponent(() => {
  return import('./containers/ProjectList/ProjectList');
});

let lastScrollY = 0;
let ticking = false;

class App extends Component {

  state = {
    shrinkHeader: false,
    showPopup: false
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

  addTaskHandler = () => {
    const title = "testing " + Math.floor(Math.random() * 1000);
    const priority = Math.floor(Math.random() * 2);
    const dueDate = new Date();
    this.props.onAddTask(title, priority, dueDate);
  }

  onPopupProceed = () => {
    
  }

  onPopupCancel = () => {
    this.setState({showPopup: false});
  }

  render() {
    let popup = null;
    if (this.state.showPopup) {
      popup = <Popup 
        text="Are you sure you want to delete the task? It cannot be undone O_O"
        proceed={this.onPopupProceed}
        cancel={this.onPopupCancel} />;
    }
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
            <Route path="/projects" component={asyncProjectList} />
            <Route path="/" exact component={DaysList} />
            <Redirect to="/" />
          </Switch>
        </main>
        {popup}
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