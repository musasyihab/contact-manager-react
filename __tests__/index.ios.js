import 'react-native';
import 'isomorphic-fetch';
import React from 'react';
import Index from '../index.ios.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import App from '../src/App.js';

/*
it('should work', () => {
  expect(true).toEqual(true);
});
*/

it('renders correctly', () => {
  const tree = renderer.create(
    <App />
  );
});
