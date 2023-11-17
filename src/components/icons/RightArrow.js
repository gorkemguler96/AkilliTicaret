import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgRightArrow = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="right-arrow_svg__feather right-arrow_svg__feather-chevron-right"
    viewBox="0 0 24 24"
    {...props}>
    <Path d="m9 18 6-6-6-6" />
  </Svg>
);
export default SvgRightArrow;
