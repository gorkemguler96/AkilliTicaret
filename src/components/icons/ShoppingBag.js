import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgShoppingBag = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="ShoppingBag_svg__feather ShoppingBag_svg__feather-shopping-bag"
    viewBox="0 0 24 24"
    {...props}>
    <Path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18" />
    <Path d="M16 10a4 4 0 0 1-8 0" />
  </Svg>
);
export default SvgShoppingBag;
