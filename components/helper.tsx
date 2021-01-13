import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export const moneyFormat = (money: number) => {
  const [currency, setCurrency] = useState('MYR');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCurrency();
  }, []);

  const fetchCurrency = async () => {
    try {
      setLoading(true);
      const currency = await AsyncStorage.getItem('@currency');
      if (currency !== null) {
        setCurrency(currency);
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }

  if (!loading) {
    return `${currency.toUpperCase()} ${money.toFixed(2)}`;
  }
};

export const titleFormat = (title: string) => title.charAt(0).toUpperCase() + title.slice(1);