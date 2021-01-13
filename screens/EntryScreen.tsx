import * as React from 'react';
import { StyleSheet, TouchableOpacity, Platform, ToastAndroid } from 'react-native';
import { Formik } from 'formik';
import { string, number, object, } from 'yup';
import {Picker} from '@react-native-picker/picker';
import { gql } from 'apollo-boost';
import client from '../graphql';
import {styles} from './styles';

import { Text, View, TextInput, useThemeColor } from '../components/Themed';

const CREATE_RECORD = gql`
  mutation CreateRecord($input:CreateOneRecordInput!) {
    recordCreateOne(record: $input) {
      recordId
    }
  }
`

const UPDATE_RECORD = gql`
  mutation recordUpdateById($id: MongoID!, $record: UpdateByIdRecordInput!) {
    recordUpdateById(_id: $id, record: $record) {
      recordId
    }
  }
`

export default function ItemScreen(props: { navigation: any; route: any; }) {
  const {navigation, route} = props;
  const {params: {item = null} = {}} = route;

  const categories = [
    {label: 'Please select an option...', value: ''},
    {label: 'Income', value: 'income'},
    {label: 'Food', value: 'food'},
    {label: 'Shopping', value: 'shopping'},
    {label: 'Miscellaneous', value: 'misc'},
  ];

  const types = [
    {label: 'Please select an option...', value: ''},
    {label: 'Income', value: 'income'},
    {label: 'Expense', value: 'expense'},
  ];

  const entryValidation = object().shape({
    category: string().required('Please select a category.'),
    desc: string()
            .max(500, 'Please enter a description with less than 500 characters.'),
    amount: number()
              .min(0, 'Please enter an amount greater than 0.')
              .required('Please enter an amount.')
              .typeError('Please enter an amount in numerical form.'),
    type: string()
            .required('Please select a transaction type.')
            .typeError('Please select a transaction type.'),
  })

  const {
    category: itemCategory = '',
    desc: itemDesc = '',
    amount: itemAmount = '',
    type: itemType = '',
  } = item || {};

  const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');

  return (
    <Formik
      initialValues={{
        category: itemCategory,
        desc: itemDesc,
        amount: itemAmount.toString(),
        type: itemType,
      }}
      validationSchema={entryValidation}
      onSubmit={values => {
        const {amount, ...input} = values;
        if (item) { // if item exists, update
           client.mutate({
            mutation: UPDATE_RECORD,
            variables: {
              id: item.id,
              record: {
                amount: parseFloat(amount),
                ...input,
              }
            },
          }).then(res => {
            if (Platform.OS === 'android') {
              ToastAndroid.show('Entry saved.', ToastAndroid.SHORT);
            }
            navigation.navigate('HomeScreen');
          }).catch(err => {
            console.error(err);
          })
        } else { // if item is null, create
          client.mutate({
            mutation: CREATE_RECORD,
            variables: {
              input: {
                amount: parseFloat(amount),
                ...input,
              },
            },
          }).then(res => {
            if (Platform.OS === 'android') {
              ToastAndroid.show('Entry saved.', ToastAndroid.SHORT);
            }
            navigation.navigate('HomeScreen');
          }).catch(err => {
            console.error(err);
          })
        }
      }}>
        {({ handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => {
          const onChangePicker = (fieldName: string, e: any) => {
            if (e !== '') {
              setFieldValue(fieldName, e);
            };
          };

          const onBlurAmount = () => {
            setFieldValue('amount', parseFloat(values.amount).toFixed(2));
          };

          return (
            <View style={styles.container}>
              <View style={styles.section}>
                <Text style={styles.title}>Category</Text>
                <View style={!errors.category ? styles.input : styles.inputError}>
                  <Picker
                    selectedValue={values.category}
                    onValueChange={e => onChangePicker('category', e)}
                    dropdownIconColor='#7b68ee'
                    style={{color, borderWidth: 0}}
                  >
                    {categories.map((category, index) => (
                      <Picker.Item
                        key={index}
                        label={category.label}
                        value={category.value}
                      />
                    ))}
                  </Picker>
                </View>
                {errors.category && touched.category && (
                  <Text style={styles.error}>{errors.category}</Text>
                )}
              </View>
              <View style={styles.section}>
                <Text style={styles.title}>Description</Text>
                <TextInput
                  onChangeText={handleChange('desc')}
                  onBlur={handleBlur('desc')}
                  value={values.desc}
                  style={!errors.desc ? styles.input : styles.inputError}
                />
                {errors.desc && touched.desc && (
                  <Text style={styles.error}>{errors.desc}</Text>
                )}
              </View>
              <View style={styles.section}>
                <Text style={styles.title}>Amount</Text>
                <TextInput
                  keyboardType='decimal-pad'
                  onChangeText={handleChange('amount')}
                  onBlur={onBlurAmount}
                  value={values.amount}
                  style={!errors.amount ? styles.input : styles.inputError}
                />
                {errors.amount && touched.amount && (
                  <Text style={styles.error}>{errors.amount}</Text>
                )}
              </View>
              <View style={styles.section}>
                <Text style={styles.title}>Type</Text>
                <View style={!errors.type ? styles.input : styles.inputError}>
                  <Picker
                    selectedValue={values.type}
                    onValueChange={e => onChangePicker('type', e)}
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
                {errors.type && touched.type && (
                  <Text style={styles.error}>{errors.type}</Text>
                )}
              </View>
              <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btnText}>Save</Text>
              </TouchableOpacity>
            </View>
          )
        }}
    </Formik>
  )
};
