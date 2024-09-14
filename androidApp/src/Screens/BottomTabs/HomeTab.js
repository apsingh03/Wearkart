import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import React from 'react';
import {globalCss} from '../../Utils/CSS';
import {GLOBALCOLOR} from '../../Utils/globalColor';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';
import BannerCarousel from '../../components/HomeTab/BannerCarousel';
import Banner1 from '../../components/HomeTab/Banner1';
import CategoriesCarousel from '../../components/HomeTab/CategoriesCarousel';
import ShopByCategory from '../../components/HomeTab/ShopByCategory';
import Testimonial from '../../components/HomeTab/Testimonial';

const HomeTab = () => {
  return (
    <>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: GLOBALCOLOR.white1,
          flex: 1,
        }}>
        {/* Header */}
        <View style={[globalCss.rowBetweenCenter]}>
          <View>
            <Text
              style={{
                fontSize: 28,
                color: GLOBALCOLOR.black2,
                fontFamily: 'Raleway-ExtraBold',
              }}>
              Shop
            </Text>
          </View>
          <View>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: GLOBALCOLOR.black2,
                backgroundColor: GLOBALCOLOR.white2,
                padding: 5,
                width: windowWidth * 0.7, // Set width to 60% of the screen width
                borderRadius: 30, // Optional: Add border radius for smooth edges
              }}
              placeholder="Search"
              placeholderTextColor="#202020"
              keyboardType="default"
              secureTextEntry={false}
            />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <BannerCarousel />
          </View>

          <View style={{marginTop: 10}}>
            <CategoriesCarousel />
          </View>

          <View style={{marginTop: 10}}>
            <ShopByCategory />
          </View>

          <View style={{marginTop: 10}}>
            <Testimonial />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default HomeTab;

const styles = StyleSheet.create({});
