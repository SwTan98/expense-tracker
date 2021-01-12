import * as React from 'react';
import { StyleSheet, Button } from 'react-native';
import { Formik } from 'formik';
import { string, number, boolean, object, } from 'yup';
import {Picker} from '@react-native-picker/picker';

import { Text, View, TextInput, useThemeColor } from '../components/Themed';

export default function ItemScreen(props: { navigation: any; route: any; }) {
  const {navigation, route} = props;
  const {params: {item = {}} = {}} = route;

  const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');

  const entryValidation = object().shape({
    username: string()
                .required('Please enter your username.'),
    password: string()
                .required('Please enter your password.'),
  })

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={entryValidation}
      onSubmit={values => {
        
      }}>
        {({ handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => {

          return (
            <View style={styles.container}>
              <View style={styles.section}>
                <Text style={styles.title}>Username</Text>
                <TextInput
                  autoCompleteType='username'
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  style={!(errors.username && touched.username) ? styles.input : styles.inputError}
                />
                {errors.username && touched.username && (
                  <Text style={styles.error}>{errors.username}</Text>
                )}
              </View>
              <View style={styles.section}>
                <Text style={styles.title}>Password</Text>
                <TextInput
                  autoCompleteType='password'
                  secureTextEntry={true}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  style={!(errors.password && touched.password)? styles.input : styles.inputError}
                />
                {errors.password && touched.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
              </View>
              <Button onPress={handleSubmit} title='Login' />
            </View>
          )
        }}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  section: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 0.3,
    borderRadius: 5,
    borderColor: 'mediumslateblue',
    padding: 10,
    justifyContent: 'center',
  },
  inputError: {
    height: 50,
    borderWidth: 0.3,
    borderRadius: 5,
    borderColor: 'crimson',
    padding: 10,
    justifyContent: 'center',
  },
  error: {
    fontSize: 12,
    color: 'crimson',
  }
});
