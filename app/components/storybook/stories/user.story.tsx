import { storiesOf } from '@storybook/react-native';
import React from 'react';

import UserProfile from '../../components/User';

const users = [
  {
    name: 'RR Martin',
    checkin: false,
  },
];

storiesOf('User', module)
  .add('default', () => {
    const user = users[0];
    return <UserProfile checkin={user.checkin} name={user.name}></UserProfile>;
  })
  .add('User checkedIn', () => {
    const user = users[0];
    return <UserProfile checkin={true} name={user.name}></UserProfile>;
  })
  .add('User out', () => {
    const user = users[0];
    return <UserProfile checkin={false} name={user.name}></UserProfile>;
  });
