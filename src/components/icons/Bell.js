import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgBell = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="Bell_svg__feather Bell_svg__feather-bell"
    viewBox="0 0 24 24"
    {...props}>
    <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
  </Svg>
);
export default SvgBell;
