import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <Redirect to="/math/tasks/chain/kaka" />
      </div>
    );
  }
};

export default Home;
