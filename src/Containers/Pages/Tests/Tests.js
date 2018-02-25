import React, {Component} from 'react';
import LinkItem from '../../../Components/UI/LinkItem';
import {connect} from 'react-redux';
import {loadMoreTests} from '../../../store/actions';
import Link from './New/Link';
class Tests extends Component {
  componentDidMount() {
    if (this.props.data.length === 0)this.props.loadData();
  }
  render() {
    return (
      <div>
        <Link />
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
