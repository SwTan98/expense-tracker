import * as React from 'react';
import { useEffect, useState, Fragment } from 'react';
import { FlatList } from 'react-native';
import { Text, View } from '../components/Themed';
import { moneyFormat } from '../components/helper';
import ListItem from '../components/ListItem';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeParamList } from '../types';
import { FloatingAction } from "react-native-floating-action";
import { gql } from 'apollo-boost';
import client from '../graphql';
import { styles } from './styles';

const GET_RECORDS = gql`
  query GetRecords {
    records (sort: _ID_DESC) {
      _id
      category
      desc
      amount
      type
      date
    }
  }
`

export default function HomeScreen({navigation, route,}: StackScreenProps<HomeParamList>) {
  const [records, setRecords] = useState([]);

  const fetchData = async () => {
    const res = await client.query({
      query: GET_RECORDS
    })

    setRecords(await res.data.records.map((record: { [x: string]: any; _id: any; }) => {
      const {_id: id, ...recordDetails} = record;
      return ({id, ...recordDetails});
    }));
  }

  useEffect(() => {
    const reload = navigation.addListener('focus', () => {
      fetchData();
    });
    return(reload);
  }, [navigation])

  const actions = [
    {
      text: 'New Entry',
      icon: require('../assets/images/money.png'),
      name: 'new',
      position: 1,
      color: 'mediumslateblue',
    },
  ];

  const calculateTotal = () => {
    let total = 0;
    if (records) {
      records.map((record: { type: string; amount: number; }) => {
        if (record.type === 'income') {
          total = total + record.amount;
        } else if (record.type === 'expense') {
          total = total - record.amount;
        };
      });
    }
    return total;
  };

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Net Transactions:</Text>
        <Text style={styles.summaryText}>{moneyFormat(calculateTotal())}</Text>
      </View>
      {records.length ? (
        <Fragment>
          <FlatList data={records} renderItem={({item}) => (
          <ListItem item={item} navigation={navigation} />
        )} />
        </Fragment>
      ) : (
        <Text style={styles.noRecord}>
          You have no transactions yet.
          Enter your first transaction using the bottom right button.
        </Text>
      )}
      <FloatingAction
        actions={actions}
        color='mediumslateblue'
        buttonSize={50}
        distanceToEdge={10}
        onPressItem={name => {
          if (name === 'new') {
            navigation.navigate('EntryScreen');
          }
        }}
      />
    </View>
  );
};