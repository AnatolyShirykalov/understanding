import React, {Component} from 'react';
import Toolbar from '../../Components/Toolbar/Toolbar'
import Popup from '../../Components/UI/ErrorPopup';
import {connect} from 'react-redux';
import {removeCurrentError} from '../../store/actions';
import { withRouter } from 'react-router-dom'

class Layout extends Component {
  render() {
    return (
      <div>
        <Toolbar/>
        <Popup message={this.props.error} close={this.props.closePopup} />
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {error: state.error}
};
const mapDispatchToProps = dispatch => ({closePopup: ()=>dispatch(removeCurrentError())});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
