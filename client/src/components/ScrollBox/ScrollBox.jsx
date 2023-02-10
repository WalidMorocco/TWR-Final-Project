import "./styles.css";
import PropTypes from "prop-types";

export const ScrollBox = ({ children }) => {
  return <div className="scroll-container">{children}</div>;
};

ScrollBox.propTypes = {
  children: PropTypes.node.isRequired,
};
