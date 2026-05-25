const React = require('react');
const {View} = require('react-native');

const MockMapView = React.forwardRef((props, ref) =>
  React.createElement(View, {...props, ref}, props.children),
);

const MockMarker = props => React.createElement(View, props, props.children);

module.exports = {
  __esModule: true,
  default: MockMapView,
  Marker: MockMarker,
  PROVIDER_GOOGLE: 'google',
  PROVIDER_DEFAULT: 'default',
};
