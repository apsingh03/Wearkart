import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';
import LazyLoadingImage from '../../components/LazyLoadingImage';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import {GLOBALCOLOR} from '../../Utils/globalColor';

import CustomButton from '../../components/CustomButton';

// Icons
import AntDesign from 'react-native-vector-icons/AntDesign';

const SplashScreen = ({navigation}) => {
  const loggedOrNotRedirectAccordingly = async () => {
    // const userObjectAsyncStorage = await AsyncStorage.getItem(
    //   'loggedUserObject',
    // );
    // console.log(userObjectAsyncStorage)

    // if (userObjectAsyncStorage === null) {
    //   navigation.navigate('SignUpScreen');
    // } else {
    //   navigation.navigate('HomeScreen');
    // }
    navigation.navigate('HomeScreen');
  };

  useEffect(() => {
    setTimeout(() => {
      // loggedOrNotRedirectAccordingly();
    }, 2000);
  }, []);

  return (
    <View
      style={{
        backgroundColor: '#fff',
        // alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 30,
        paddingHorizontal: 20,
      }}>
      <View></View>

      <View style={{alignItems: 'center'}}>
        <LazyLoadingImage
          source={require('../../assets/icons/ShoppingBagCircleIcon.png')}
          // uri="https://picsum.photos/id/237/200/300"
          resizeMode="cover"
          height={200}
          width={200}
        />

        <View style={{marginTop: -30}}>
          <Text
            style={{
              fontSize: 40,
              color: `${GLOBALCOLOR.black2}`,
              // fontWeight: 900,
              fontFamily: 'Raleway-ExtraBold',
              textAlign: 'center',
            }}>
            Ecommerce
          </Text>

          <View style={{marginTop: 10}}>
            <Text
              style={{
                fontSize: 18,
                color: '#202020',
                fontWeight: 500,
                fontFamily: 'Raleway-Medium',
                marginBottom: 10,
                textAlign: 'center',
              }}>
              {' '}
              Welcome to Fashion Deal's For Your
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: '#202020',
                fontWeight: 500,
                fontFamily: 'Raleway-Medium',
                textAlign: 'center',
              }}>
              {' '}
              Daily Needs
            </Text>
          </View>
        </View>
      </View>

      <View>
        <View>
          <CustomButton
            title="Let's get started"
            onPress={() => navigation.navigate('SplashHellowCard')}
            width={'100%'}
            height={50}
            backgroundColor={GLOBALCOLOR.bluePrimary}
            textColor={GLOBALCOLOR.white2}
            fontFamily="Nunito-Regular" // Make sure the font is linked and available
            fontSize={18}
            titleWeight={400}
          />
        </View>

        <View
          style={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#202020',
              fontWeight: 500,
              fontFamily: 'Nunito-Regular',
              textAlign: 'center',
            }}>
            I already have an account{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LogInScreen')}>
            <View
              style={{
                width: 25,
                height: 25,
                backgroundColor: '#004CFF',
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AntDesign name="arrowright" size={15} color={'#fff'} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
