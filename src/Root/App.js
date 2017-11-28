import React, { Component } from 'react';
import classes from './App.css';
import Layout from '../Containers/Layout/Layout';
import routes from './Routes'

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

export default App;
