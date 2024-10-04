import {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';
import {globalCss} from '../../Utils/CSS';
import {GLOBALCOLOR} from '../../Utils/globalColor';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FilterCategory = ({
  isFilterChildRadiosVisible,
  categoryItem,
  handleFilterToggle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => handleFilterToggle(categoryItem?.id)}
      style={[globalCss.rowBetweenCenter, {marginBottom: 10}]}>
      <Text
        style={{
          fontSize: 20,
          color: GLOBALCOLOR.black2,
          fontFamily: 'Nunito-ExtraBold',
        }}>
        {categoryItem?.name}
      </Text>

      <View>
        {isFilterChildRadiosVisible[categoryItem?.id] ? (
          <MaterialIcons name="keyboard-arrow-up" color={'#000'} size={30} />
        ) : (
          <MaterialIcons name="keyboard-arrow-down" color={'#000'} size={30} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default FilterCategory;

const styles = StyleSheet.create({});
