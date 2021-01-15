import * as React from 'react';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Text, View, TextInput, useThemeColor } from '../components/Themed';
import { moneyFormat } from '../components/helper';
import ListItem from '../components/ListItem';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeParamList } from '../types';
import { FloatingAction } from "react-native-floating-action";
import { gql } from '@apollo/client';
import client from '../graphql';
import { styles } from './styles';
import {Picker} from '@react-native-picker/picker';

const GET_RECORDS = gql`
  query GetRecords ($type: EnumRecordType, $desc: String) {
    records (sort: _ID_DESC, filter: {type: $type, desc: $desc}) {
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
  const [typeFilter, setTypeFilter] = useState('');
  const [search, setSearch] = useState('');

  const fetchData = async (variables: {}) => {
    const res = await client.query({
      query: GET_RECORDS,
      variables,
    });

    setRecords(await res.data.records.map((record: { [x: string]: any; _id: any; }) => {
      const {_id: id, ...recordDetails} = record;
      return ({id, ...recordDetails});
    }));
  }

  useEffect(() => {
    const variables = {};
    const reload = navigation.addListener('focus', () => {
      fetchData(variables);
    });
    if (typeFilter) {
      variables.type = typeFilter;
    };
    if (search) {
      variables.desc = search;
    };
    console.log(variables);
    fetchData(variables);
    return(reload);
  }, [typeFilter, search]);

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

  const types = [
    {label: 'Transaction filter', value: ''},
    {label: 'Income', value: 'income'},
    {label: 'Expense', value: 'expense'},
  ];

  const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Net Transactions:</Text>
        <Text style={styles.summaryText}>{moneyFormat(calculateTotal())}</Text>
      </View>
      <View style={styles.input}>
        <Picker
          selectedValue={typeFilter}
          onValueChange={setTypeFilter}
          dropdownIconColor='#7b68ee'
          style={{color, borderWidth: 0}}
        >
          {types.map((type, index) => (
            <Picker.Item
              key={index}
              label={type.label}
              value={type.value}
            />
          ))}
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={setSearch}
        placeholder="Search by description..."
        placeholderTextColor="#AAA"
      />
      {records.length ? (
        <FlatList onEndReached={() => {
        }} data={records} renderItem={({item}) => (
          <ListItem item={item} navigation={navigation} />
        )} />
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