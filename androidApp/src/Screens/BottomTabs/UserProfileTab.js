import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GLOBALCOLOR} from '../../Utils/globalColor';
import {globalCss} from '../../Utils/CSS';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProfileTabCards from '../../components/ProfileTab/ProfileTabCards';

const UserProfileTab = () => {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: GLOBALCOLOR.white1,
        flex: 1,
        position: 'relative',
      }}>
      {/* Header */}
      <View style={[globalCss.flexRow]}>
        <Text
          style={{
            fontSize: 20,
            color: GLOBALCOLOR.black2,
            // backgroundColor: '#E5EBFC',
            fontFamily: 'Raleway-ExtraBold',
            padding: 5,
          }}>
          User Profile
        </Text>
      </View>

      <View>
        <ProfileTabCards title={'Profile'} />
        <ProfileTabCards title={'Wish List'} />
        <ProfileTabCards title={'Settings'} />
      </View>
    </View>
  );
};

export default UserProfileTab;

const styles = StyleSheet.create({});
