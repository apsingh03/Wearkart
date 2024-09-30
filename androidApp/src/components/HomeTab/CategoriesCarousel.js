import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GLOBALCOLOR} from '../../Utils/globalColor';
import {globalCss} from '../../Utils/CSS';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';

import SkeltonUi from '../SkeltonUi';
import LazyLoadingImage from '../LazyLoadingImage';
const CategoriesCarousel = ({reduxData}) => {
  // console.log(
  //   'reduxData - ',
  //   reduxData && reduxData[0]?.actressCarouselActressCarouselImages,
  // );

  const isLoading =
    !reduxData || !reduxData[0]?.actressCarouselActressCarouselImages;

  return (
    <View>
      {isLoading ? (
        <FlatList
          data={['', '', '', '', '', '', '', '', '', '']}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({item, idx}) => {
            // console.log("item - " , item)
            return (
              <View
                style={[
                  globalCss.flexColumn,
                  {width: windowWidth / 4, marginRight: 10},
                ]}>
                <SkeltonUi circle={true} width={100} height={100} />
              </View>
            );
          }}
        />
      ) : (
        <FlatList
          data={reduxData && reduxData[0]?.actressCarouselActressCarouselImages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({item, idx}) => {
            // console.log("item - " , item)
            return (
              <View
                style={[
                  globalCss.flexColumn,
                  {width: windowWidth / 4, marginRight: 10},
                ]}>
                <LazyLoadingImage
                  uri={item.imageSrc}
                  width={100}
                  height={100}
                  resizeMode="cover"
                  borderRadius={200}
                />
                {/* <Image
                  source={{
                    uri:
                      item.imageSrc ||
                      'https://images.unsplash.com/photo-1617957743103-310accdfb999?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  }}
                  style={{width: 100, height: 100, borderRadius: 100}}
                  resizeMode="cover"
                /> */}
                <View style={{marginTop: 0}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: GLOBALCOLOR.black2,
                      fontFamily: 'Nunito-ExtraBold',
                    }}>
                    {item.name}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default CategoriesCarousel;

const styles = StyleSheet.create({});
