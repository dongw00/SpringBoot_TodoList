import React, { Component } from 'react';
import { CookiesProvider } from 'react-cookie';
import './assets/css/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoEdit from './components/TodoEdit';

class App extends Component {
  render() {
    return (
      <CookiesProvider>
        <Router>
          <Switch>
            <Route path="/" exact={true} component={TodoList} />
            <Route path="/todo/:id" component={TodoEdit} />
          </Switch>
        </Router>
      </CookiesProvider>
    );
  }
}

export default App;
