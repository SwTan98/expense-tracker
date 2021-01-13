import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
  },
  btn: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 50,
    borderRadius: 75,
    backgroundColor: 'mediumslateblue',
    color: '#fff'
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  summary: {
    backgroundColor: 'mediumslateblue',
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
  },
  summaryTitle: {
    fontSize: 20,
    fontFamily: 'sans-serif-condensed',
  },
  summaryText: {
    fontSize: 40,
    fontFamily: 'sans-serif-condensed',
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  floatingBtnIcon: {
    color: 'mediumslateblue',
  },
  noRecord: {
    fontSize: 14,
    textAlign: 'center',
    padding: 50,
  },
  itemSection: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: '#666',
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'mediumslateblue',
  },
  desc: {
    fontSize: 16,
  },
  moneyIn: {
    color: 'darkgreen',
    fontSize: 16,
  },
  moneyOut: {
    color: 'firebrick',
    fontSize: 16,
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 25,
  },
  greeting: {
    fontSize: 20,
    textAlign: 'center'
  },
  settings: {
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'mediumslateblue',
    paddingBottom: 20,
  },
  profileSection: {
    paddingBottom: 20,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
});