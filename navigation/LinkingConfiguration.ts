import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Login: {
        screens: {
          LoginScreen: 'login',
          RegisterScreen: 'register',
        },
      },
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
              ItemScreen: 'item',
              EntryScreen: 'entry',
            },
          },
          Profile: {
            screens: {
              ProfileScreen: 'profile',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
