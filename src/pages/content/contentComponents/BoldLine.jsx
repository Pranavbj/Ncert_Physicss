import PropTypes from "prop-types";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";

const BoldLine = ({ text }) => {
  return (
    <>
      <p className="font-bold relative my-4">
        <Latex>{text}</Latex>
      </p>
    </>
  );
};

BoldLine.propTypes = {
  text: PropTypes.string.isRequired,
};

export default BoldLine;
