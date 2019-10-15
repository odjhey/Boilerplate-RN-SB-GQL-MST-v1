import React from 'react';
import { View } from 'react-native';
import { Badge, Avatar, Text } from 'react-native-elements';

export interface IUserProfileProps {
  name: String;
  checkin: Boolean;
  onCheckIn?: any;
}

const UserProfile = (props: IUserProfileProps) => {
  const { name, checkin, onCheckIn } = props;
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
        <Avatar
          rounded
          title="O"
          size="xlarge"
          onPress={() => {
            onCheckIn ? onCheckIn() : null;
          }}></Avatar>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text h1>{name}</Text>
      </View>
    </View>
  );
};
export default UserProfile;
