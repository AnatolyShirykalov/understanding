import { SelectableGroup } from "react-selectable";
import ReactDOM from "react-dom";

export default class Selectable extends SelectableGroup {
  _selectElements(e) {
    const selectbox = ReactDOM.findDOMNode(this.refs.selectbox);
    if (!selectbox) return this.props.onClick(e);
    const dx = window.scrollX;
    const dy = window.scrollY;
    const rect = selectbox.getBoundingClientRect();
    const top = rect.top + dy;
    const left = rect.left + dx;
    const bottom = rect.bottom + dy;
    const right = rect.right + dx;

    this.props.onSelection({
      top,
      left,
      right,
      bottom
    });
  }
}
