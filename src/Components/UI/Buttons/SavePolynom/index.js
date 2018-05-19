import SaveMatrix from "../SaveMatrix";
import PropTypes from "prop-types";

class SavePolynom extends SaveMatrix {}

SavePolynom.propTypes = {
  value: PropTypes.string,
  matrix: PropTypes.object.isRequired,
  storageKey: PropTypes.string
};

SavePolynom.defaultProps = {
  value: "Сохранить",
  storageKey: "polynomSelectData"
};

export default SavePolynom;
