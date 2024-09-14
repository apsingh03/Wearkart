import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {globalCss} from '../../Utils/CSS';
import {GLOBALCOLOR} from '../../Utils/globalColor';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';

const Testimonial = () => {
  const data = [
    {
      id: 1,
      url: 'https://rukminim2.flixcart.com/image/832/832/xif0q/dress/z/s/i/s-a1-zwerlon-original-imagn9uycxbhshur.jpeg?q=70&crop=false',
      comment:
        'The FIT!! Thats what stood out for me when I started buying FableStreet. And now I know I can order from them and get that same perfect fit, any time I want.',
      name: 'Name 1 ',
    },
    {
      id: 2,
      url: 'https://rukminim2.flixcart.com/image/832/832/xif0q/dress/z/s/i/s-a1-zwerlon-original-imagn9uycxbhshur.jpeg?q=70&crop=false',
      comment:
        'FableStreet understands that every woman deserves clothing that fits her body perfectly.',
      name: 'Name 2 ',
    },
    {
      id: 3,
      url: 'https://rukminim2.flixcart.com/image/832/832/xif0q/dress/z/s/i/s-a1-zwerlon-original-imagn9uycxbhshur.jpeg?q=70&crop=false',
      comment:
        'Its a relief that I have finally found a brand that makes clothes for Indian women. The fit is perfect and it falls perfectly on my curves',
      name: 'Name 3 ',
    },
  ];
  return (
    <View>
      <View>
        <Text style={{textAlign: 'center'}}>Customer Testimonials</Text>
      </View>

      <View style={{marginTop: 10}}>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View>
                <Image
                  source={{
                    uri: item.url,
                  }}
                  style={{
                    width: windowWidth,
                    height: windowHeight / 2.5,
                    borderRadius: 10,
                  }}
                  resizeMethod="cover"
                />

                <View style={{paddingHorizontal: 20}}>
                  <Text style={{textAlign: 'center'}}> {item.comment} ss</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Testimonial;

const styles = StyleSheet.create({});
