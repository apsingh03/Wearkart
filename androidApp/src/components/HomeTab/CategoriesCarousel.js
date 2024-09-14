import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GLOBALCOLOR} from '../../Utils/globalColor';
import {globalCss} from '../../Utils/CSS';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';

const CategoriesCarousel = () => {
  const data = [
    {
      id: 1,
      url: 'https://rukminim2.flixcart.com/image/832/832/xif0q/dress/z/s/i/s-a1-zwerlon-original-imagn9uycxbhshur.jpeg?q=70&crop=false',
      title: 'Cloth',
    },
    {
      id: 2,
      url: 'https://rukminim2.flixcart.com/image/832/832/xif0q/dress/z/s/i/s-a1-zwerlon-original-imagn9uycxbhshur.jpeg?q=70&crop=false',
      title: 'Jeans',
    },
    {
      id: 3,
      url: 'https://rukminim2.flixcart.com/image/832/832/xif0q/dress/z/s/i/s-a1-zwerlon-original-imagn9uycxbhshur.jpeg?q=70&crop=false',
      title: 'Crop Top',
    },
    {
      id: 4,
      url: 'https://rukminim2.flixcart.com/image/832/832/xif0q/dress/z/s/i/s-a1-zwerlon-original-imagn9uycxbhshur.jpeg?q=70&crop=false',
      title: 'Lower',
    },
    {
      id: 5,
      url: 'https://rukminim2.flixcart.com/image/832/832/xif0q/dress/z/s/i/s-a1-zwerlon-original-imagn9uycxbhshur.jpeg?q=70&crop=false',
      title: 'T-shirt',
    },
    {
      id: 6,
      url: 'https://rukminim2.flixcart.com/image/832/832/xif0q/dress/z/s/i/s-a1-zwerlon-original-imagn9uycxbhshur.jpeg?q=70&crop=false',
      title: 'Cloth',
    },
    {
      id: 7,
      url: 'https://rukminim2.flixcart.com/image/832/832/xif0q/dress/z/s/i/s-a1-zwerlon-original-imagn9uycxbhshur.jpeg?q=70&crop=false',
      title: 'Saree',
    },
    {
      id: 8,
      url: 'https://rukminim2.flixcart.com/image/832/832/xif0q/dress/z/s/i/s-a1-zwerlon-original-imagn9uycxbhshur.jpeg?q=70&crop=false',
      title: 'Suit',
    },
    {
      id: 9,
      url: 'https://rukminim2.flixcart.com/image/832/832/xif0q/dress/z/s/i/s-a1-zwerlon-original-imagn9uycxbhshur.jpeg?q=70&crop=false',
      title: 'Shirts',
    },
    {
      id: 10,
      url: 'https://rukminim2.flixcart.com/image/832/832/xif0q/dress/z/s/i/s-a1-zwerlon-original-imagn9uycxbhshur.jpeg?q=70&crop=false',
      title: 'Garments',
    },
  ];

  return (
    <View>
      <FlatList
        data={data}
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
              <Image
                source={{uri: item.url}}
                style={{width: 100, height: 100, borderRadius: 100}}
                resizeMethod="contain"
              />
              <View style={{marginTop: 10}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: GLOBALCOLOR.black2,
                    fontFamily: 'Raleway-ExtraBold',
                  }}>
                  {item.title}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default CategoriesCarousel;

const styles = StyleSheet.create({});
