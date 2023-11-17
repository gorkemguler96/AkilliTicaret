import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
const SvgHamburger = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 20 16"
    {...props}>
    <G
      fill="#FE5B00"
      stroke="#FE5B00"
      strokeLinecap="round"
      strokeWidth={2}
      data-name="Group 175">
      <Path d="M19 15H1" data-name="Line 16" />
      <Path d="M19 8H1" data-name="Line 17" />
      <Path d="M19 1H1" data-name="Line 18" />
    </G>
  </Svg>
);
export default SvgHamburger;
