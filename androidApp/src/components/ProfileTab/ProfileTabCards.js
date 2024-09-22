import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {GLOBALCOLOR} from '../../Utils/globalColor';
import {globalCss} from '../../Utils/CSS';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const ProfileTabCards = ({title, routeLink}) => {
  // {title, navigation, routeLink}
  const navigation = useNavigation();

  // console.log(
  //   'routeLink - ',
  //   routeLink,
  //   routeLink !== undefined ? 'onpress' : 'null',
  // );
  return (
    <View
      style={[
        globalCss.rowBetweenCenter,
        {
          paddingVertical: 20,
          borderBottomWidth: 0.5,
          borderBottomColor: '#ddd',
        },
      ]}>
      <Text
        style={{
          fontSize: 18,
          color: '#000',
          fontFamily: 'Nunito-Bold',
        }}>
        {title || ''}
      </Text>

      <TouchableOpacity
        onPress={() =>
          routeLink !== undefined ? navigation.navigate(routeLink) : null
        }>
        <AntDesign name="right" size={20} color={'#000'} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileTabCards;

const styles = StyleSheet.create({});
