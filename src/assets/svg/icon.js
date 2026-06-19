import * as React from 'react';
import * as Svg from 'react-native-svg';

export default function MyIcon() {
  return (
    <Svg.Svg height="100" width="100">
      <Svg.Circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="2.5" fill="green" />
    </Svg.Svg>
  );
}