import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
const SvgPlusCircle = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="PlusCircle_svg__feather PlusCircle_svg__feather-plus-circle"
    viewBox="0 0 24 24"
    {...props}>
    <Circle cx={12} cy={12} r={10} />
    <Path d="M12 8v8M8 12h8" />
  </Svg>
);
export default SvgPlusCircle;
