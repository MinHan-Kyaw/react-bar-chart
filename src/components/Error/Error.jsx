import PropTypes from "prop-types";

import "./Error.css";

const Error = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-text">{message}</div>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
