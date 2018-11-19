import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import Nav from './components/Nav';
import Callback from './components/Callback';
import ListBook from './components/ListBook';
import CreateBook from './components/CreateBook';
import GuardedRoute from './components/GuardedRoute';
import './App.css';
import auth from './Auth';

class App extends Component {

  state = {
    tryingSilent: true
  };

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') return;
    try {
      await auth.silentAuth();
      this.setState({ tryingSilent: false });
      this.forceUpdate();
    } catch (err) {
      if (err.error === 'login_required') return;
      console.log(err.error);
    }
  }

  render() {
    if (!this.state.tryingSilent) {
      return (
        <div>
          <Nav />
          <Route exact path='/' component={ListBook} />
          <GuardedRoute path='/create' component={CreateBook} />
          <Route exact path='/callback' component={Callback} />
        </div>
      );
    }

    return 'Logging in silently';
  }
}

export default withRouter(App);
