import * as React from 'react';
import { Alert, Platform, ToastAndroid } from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import moment from 'moment';
import { gql } from 'apollo-boost';
import client from '../graphql';

import { Text, View } from '../components/Themed';
import { moneyFormat, titleFormat } from '../components/helper';
import { styles } from './styles';

const DELETE_RECORD = gql`
  mutation DeleteRecord ($input: MongoID!) {
    recordDeleteById(_id: $input) {
      recordId
    }
  }
`

export default function ItemScreen(props: { route: any, navigation: any }) {
  const {navigation, route} = props;
  const {item} = route.params;

  const actions = [
    {
      text: 'Edit',
      icon: require('../assets/images/edit.png'),
      name: 'edit',
      position: 1,
      color: 'mediumslateblue',
    },
    {
      text: 'Delete',
      icon: require('../assets/images/delete.png'),
      name: 'delete',
      position: 2,
      color: 'lightcoral',
    },
  ];

  const navigate = (name: any) => {
    switch (name) {
      case 'edit':
        navigation.navigate('EntryScreen', {
          item,
          headerTitle: 'Edit',
        })
        break;
      case 'delete':
        Alert.alert(
          'Confirmation',
          'Do you want to delete this entry?',
          [
            {
              text: 'No',
              style: 'default',
            },
            {
              text: 'Yes',
              onPress: () => {
                client.mutate({
                  mutation: DELETE_RECORD,
                  variables: {
                    input: item.id,
                  }
                }).then(res => {
                  if (Platform.OS === 'android') {
                    ToastAndroid.show('Entry deleted.', ToastAndroid.SHORT);
                  }
                  navigation.navigate('HomeScreen');
                }).catch(err => {
                  console.error(err);
                })
              },
              style: 'destructive',
            }
          ],
        );
        break;
      case 'default':
        break;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.itemSection}>
        <Text style={styles.itemTitle}>
          Category
        </Text>
        <Text style={styles.desc}>
          {titleFormat(item.category)}
        </Text>
      </View>
      <View style={styles.itemSection}>
        <Text style={styles.itemTitle}>
          Description
        </Text>
        <Text style={styles.desc}>
          {item.desc}
        </Text>
      </View>
      <View style={styles.itemSection}>
        <Text style={styles.itemTitle}>
          {item.type === 'income' ? 'Money In' : 'Money Out'}
        </Text>
        <Text style={item.type === 'income' ? styles.moneyIn : styles.moneyOut}>
          {moneyFormat(item.amount)}
        </Text>
      </View>
      <View style={styles.itemSection}>
        <Text style={styles.itemTitle}>Time</Text>
        <Text style={styles.desc}>
          {moment(item.date).format('DD MMM YYYY, hh:mm A')}
        </Text>
      </View>
      <FloatingAction
        actions={actions}
        color='mediumslateblue'
        buttonSize={50}
        distanceToEdge={10}
        onPressItem={navigate}
      />
    </View>
  );
};