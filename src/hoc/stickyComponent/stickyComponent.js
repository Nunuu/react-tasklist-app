import React, { Component } from 'react';

const stickyComponent = (WrappedComponent) => {
  
  let lastScrollY = 0;
  let ticking = false;

  return class extends Component {
    
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
      return <WrappedComponent 
        {...this.props} 
        {...this.state} 
        shrinkHeader={this.state.shrinkHeader} />
    }
  }
} 

export default stickyComponent;