import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';
import LazyLoadingImage from '../../components/LazyLoadingImage';
import {globalCss} from '../../Utils/CSS';
import {GLOBALCOLOR} from '../../Utils/globalColor';
import CustomButton from '../../components/CustomButton';

const HelloCard = ({navigation}) => {
  return (
    <View
      style={[
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
        },
      ]}>
      <ImageBackground
        source={require('../../assets/icons/bubble01.png')}
        resizeMode="stretch"
        style={styles.image}>
        <View
          style={{
            // padding: 10,
            width: windowWidth - 50,
            alignSelf: 'center',
            marginTop: '20%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            elevation: 20,
          }}>
          <LazyLoadingImage
            source={require('../../assets/images/gettingReady.png')}
            // uri="https://picsum.photos/id/237/200/300"
            resizeMode="cover"
            height={windowHeight / 2}
            width={'100%'}
          />
          <View
            style={{
              backgroundColor: '#fff',
              padding: 30,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              marginTop: -15,
            }}>
            <Text
              style={{
                fontSize: 30,
                color: `${GLOBALCOLOR.black2}`,
                // fontWeight: 900,
                fontFamily: 'Raleway-ExtraBold',
                textAlign: 'center',
                marginTop: -10,
              }}>
              Ready
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: `${GLOBALCOLOR.black1}`,
                // fontWeight: 900,
                fontFamily: 'Nunito-Light',
                textAlign: 'center',
                marginTop: 10,
              }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio dicta nam fuga illo amet laborum id aut tenetur rerum
              quam quae ab, nobis neque consectetur iure sed architecto mollitia
              praesentium.
            </Text>
          </View>
        </View>
      </ImageBackground>

      <View style={{alignItems: 'center', paddingBottom: 10}}>
        <View style={[globalCss.flexRow, {gap: 10, marginBottom: 20}]}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => [navigation.navigate('SplashHellowCard')]}>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 100,
                backgroundColor: '#C7D6FB',
              }}></View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('SplashReadyCard')}>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 100,
                backgroundColor: 'blue',
              }}></View>
          </TouchableOpacity>
        </View>

        <View>
          {/* <Pressable> */}
          <CustomButton
            title="Skip It"
            onPress={() => navigation.navigate('WelcomeScreen')}
            width={'100%'}
            height={50}
            backgroundColor={GLOBALCOLOR.bluePrimary}
            textColor={GLOBALCOLOR.white2}
            fontFamily="Nunito-Regular" // Make sure the font is linked and available
            fontSize={18}
            titleWeight={400}
          />
          {/* </Pressable> */}
        </View>
      </View>
    </View>
  );
};

export default HelloCard;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: windowHeight - 150,
    // justifyContent: 'center',
  },
});
