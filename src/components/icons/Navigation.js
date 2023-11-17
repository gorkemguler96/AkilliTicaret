import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgNavigation = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="Navigation_svg__feather Navigation_svg__feather-navigation"
    viewBox="0 0 24 24"
    {...props}>
    <Path d="m3 11 19-9-9 19-2-8-8-2z" />
  </Svg>
);
export default SvgNavigation;
