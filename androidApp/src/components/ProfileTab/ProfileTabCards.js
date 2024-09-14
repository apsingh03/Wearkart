import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GLOBALCOLOR} from '../../Utils/globalColor';
import {globalCss} from '../../Utils/CSS';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ProfileTabCards = ({title}) => {
  return (
    <View style={[globalCss.rowBetweenCenter, {paddingVertical: 15}]}>
      <Text
        style={{
          fontSize: 18,
          color: '#000',
          fontFamily: 'Nunito-Bold',
        }}>
        {title}
      </Text>

      <Pressable>
        <AntDesign name="right" size={20} color={'#000'} />
      </Pressable>
    </View>
  );
};

export default ProfileTabCards;

const styles = StyleSheet.create({});
