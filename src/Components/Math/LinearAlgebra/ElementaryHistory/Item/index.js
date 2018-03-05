import React, {Component} from 'react';
import classes from './index.css';
import MatrixPair from '../../MatrixPair';
import classnames from 'classnames';
class Item extends Component {
  state = {
    expand: true,
  }
  toggle = () => {
    this.setState({expand: !this.state.expand});
  }
  render() {
    const btnClass = classnames([
      classes.Btn, {
        [classes.HideBtn]: this.state.expand,
        [classes.ShowBtn]: !this.state.expand,
      }]);
    const btnText = this.state.expand ? 'Свернуть' : 'Развернуть';
    return (
      <div className={classes.Item}>
        <button className={btnClass} onClick={this.toggle}>{btnText}</button>
        <div className={classnames({[classes.Hide]: !this.state.expand})}>
          <MatrixPair matrices={this.props.item.matrices} />
          {this.props.item.transforms.map((t, i) =>(
            <div key={i}>
              {this.props.prettyTransform(i, t)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Item;
