import * as React from 'react';
import { useState, useEffect } from 'react';
import { TouchableOpacity, Platform, ToastAndroid } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

import { Text, View, TextInput, useThemeColor } from '../components/Themed';
import { styles } from './styles';

const currencies = [
  {label: 'Malaysia (RM)', value: 'myr'},
  {label: 'Singapore (SGD)', value: 'sgd'},
  {label: 'United States ($)', value: 'usd'},
];

export default function ProfileScreen(props: { navigation: any; }) {
  const [name, setName] = useState('User');
  const [currency, setCurrency] = useState('myr');
  const [isLoading, setIsLoading] = useState(false);
  const {navigation} = props;

  useEffect(() => {
    fetchSettings();
  }, [])

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const name = await AsyncStorage.getItem('@name');
      const currency = await AsyncStorage.getItem('@currency');
      if (name !== null) {
        setName(name);
      }
      if (currency !== null) {
        setCurrency(currency);
      }
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const storeSettings = async () => {
    try {
      await AsyncStorage.setItem('@name', name);
      await AsyncStorage.setItem('@currency', currency);
      if (Platform.OS === 'android') {
        ToastAndroid.show('Settings saved, please restart app for currency to take effect.', ToastAndroid.LONG);
      }
      navigation.navigate('HomeScreen');

    } catch (e) {
      console.error(e);
    }
  };

  const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');

  return (
    <View style={styles.profileContainer}>
      <View>
        <Text style={styles.greeting}>
          <Ionicons name='person-circle' size={100} />
        </Text>
        <Text style={styles.greeting}>
          {`Hi, ${name}`}
        </Text>
      </View>
      <View style={styles.settings}>
        <Text style={styles.header}>
          Settings
        </Text>
        <View style={styles.profileSection}>
          <Text style={styles.title}>
            Name
          </Text>
          <TextInput style={{width: '100%', ...styles.input}} onChangeText={setName} value={name} />
        </View>
        <View style={styles.profileSection}>
          <Text style={styles.title}>
            Currency
          </Text>
          <View style={{width: '100%', ...styles.input}}>
            <Picker
              selectedValue={currency}
              onValueChange={setCurrency}
              dropdownIconColor='#7b68ee'
              style={{color, borderWidth: 0}}
            >
              {currencies.map((currency, index) => (
                <Picker.Item
                  key={index}
                  label={currency.label}
                  value={currency.value}
                />
              ))}
            </Picker>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.btn} onPress={storeSettings}>
        <Text style={styles.btnText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};
