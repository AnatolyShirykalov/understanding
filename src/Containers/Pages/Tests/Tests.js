import React, {Component} from 'react';
import LinkItem from '../../../Components/UI/LinkItem';
import {connect} from 'react-redux';
import {loadMoreTests} from '../../../store/actions';
class Tests extends Component {
  componentDidMount() {
    this.props.loadData();
  }
  render() {
    return (
      <div>
        {this.props.data.map(test=>(
          <LinkItem key={test._id} to={`/tests/${test._id}`} title={test.title}/>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({tests}) => tests;
const mapDispatchToProps = dispatch => ({
  loadData: skip => dispatch(loadMoreTests(skip)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Tests);
