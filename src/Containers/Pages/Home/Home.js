import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <Redirect to="/math/tasks/common/kaka" />
      </div>
    );
  }
};

export default Home;
