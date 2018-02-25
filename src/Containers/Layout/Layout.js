import React, {Component} from 'react';
import Toolbar from '../../Components/Toolbar/Toolbar'
import Popup from '../../Components/UI/ErrorPopup';
import {connect} from 'react-redux';
import {removeCurrentError} from '../../store/actions';

class Layout extends Component {
  render() {
    return (
      <div>
        <Toolbar/>
        {this.props.error ?
            <Popup message={this.props.error} close={this.props.closePopup}/>
            : null}
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({error}) => ({error});
const mapDispatchToProps = dispatch => ({closePopup: ()=>dispatch(removeCurrentError())});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
