import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgTag = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="tag_svg__feather tag_svg__feather-tag"
    viewBox="0 0 24 24"
    {...props}>
    <Path d="m20.59 13.41-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01" />
  </Svg>
);
export default SvgTag;
