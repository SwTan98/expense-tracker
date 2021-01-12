import * as React from 'react';
import { StyleSheet, Button, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';

export default function ProfileScreen() {
  const onClickLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'No',
          onPress: () => alert('Cancelled'),
          style: 'default',
        },
        {
          text: 'Yes',
          onPress: () => alert('Confirmed'),
          style: 'destructive',
        }
      ],
    );
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          <Ionicons name='person-circle' size={100} />
        </Text>
        <Text style={styles.title}>
          You're logged in as See Wei
        </Text>
      </View>
      <Button color='mediumslateblue' onPress={onClickLogout} title="Log Out" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 50,
  },
  title: {
    fontSize: 30,
    textAlign: 'center'
  },
});
