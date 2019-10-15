import React from 'react';
import { View } from 'react-native';
import { Avatar, Badge, Text } from 'react-native-elements';
import { useQuery } from '../../../src/models/reactUtils';
import { observer } from 'mobx-react';

const Profile = observer(props => {
  const { name, checkin } = props;
  return (
    <View style={{ justifyContent: 'center', paddingTop: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {checkin ? (
          <Badge value="Online Status" status="success"></Badge>
        ) : (
          <Badge value="Online Status" status="error"></Badge>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingTop: 10,
        }}>
        <Avatar rounded title="O" size="xlarge"></Avatar>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text h1>{name}</Text>
      </View>
    </View>
  );
});

export default observer(props => {
  const { store } = useQuery();
  const { name, checkin } = store.me;
  return <Profile name={name} checkin={checkin}></Profile>;
});