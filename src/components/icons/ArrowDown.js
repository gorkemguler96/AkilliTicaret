import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgArrowDown = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="ArrowDown_svg__feather ArrowDown_svg__feather-chevron-down"
    viewBox="0 0 24 24"
    {...props}>
    <Path d="m6 9 6 6 6-6" />
  </Svg>
);
export default SvgArrowDown;
