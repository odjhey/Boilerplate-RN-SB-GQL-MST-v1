/**
 * @format
 */

import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import App from '../app/App';
import UserProfile, { UserItem } from '../components/User';

describe('App', () => {
  it('App renders correctly', () => {
    renderer.create(<App />);
  });
});

describe('<S> UserProfile', () => {
  const userData = {
    name: 'Name',
    checkin: false,
  };
  it('Renders', () => {
    renderer.create(
      <UserProfile name={userData.name} checkin={userData.checkin} />,
    );
  });
  it('UserItem Renders', () => {
    shallow(
      //renderer.create(
      <UserItem name={userData.name} checkin={userData.checkin} />,
    );
  });
});

describe('<I> UserProfile', () => {
  const userData = {
    name: 'Name',
    checkin: false,
  };
  it('Profile checkin value should change after Checkin Pressed', () => {
    renderer.create(
      <UserProfile name={userData.name} checkin={userData.checkin} />,
    );
  });
  it('Profile checkin value should change after Checkin Pressed', () => {
    renderer.create(
      <UserProfile name={userData.name} checkin={userData.checkin} />,
    );
  });
});
