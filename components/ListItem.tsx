import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { moneyFormat, titleFormat } from '../components/helper';
import { Item } from '../types';

const ListItem = (props: { item: Item, navigation: any, }) => {
  const {item, navigation} = props;

  const navigateItem = () => {
    navigation.navigate('ItemScreen', {
      item,
    })
  }

  return (
    <TouchableOpacity style={styles.listItem} onPress={navigateItem}>
      <View style={styles.listItemView}>
        <View style={styles.listItemDesc}>
          <Text style={styles.listItemText}>
            {titleFormat(item.category)}
          </Text>
          <Text style={styles.listItemDescText}>
            {item.desc}
          </Text>
        </View>
        <View style={styles.listItemAmount}>
          <Text style={item.type === 'income' ? styles.listItemAmountIn : styles.listItemAmountOut}>
            {moneyFormat(item.amount)}
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward-outline" size={20} color="slateblue" onPress={() => {}} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: '#666',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  listItemDesc: {
    flexDirection: 'column',
    width: '75%',
    paddingRight: 30,
  },
  listItemText: {
    fontSize: 16,
  },
  listItemDescText: {
    fontSize: 12,
    color: 'dimgray'
  },
  listItemAmount: {
    width: '25%',
    alignItems: 'flex-start',
  },
  listItemAmountIn: {
    color: 'darkgreen',
    fontSize: 14,
    fontWeight: 'bold',
  },
  listItemAmountOut: {
    color: 'firebrick',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

ListItem.defaultProps = {
  item: {},
};

export default ListItem;