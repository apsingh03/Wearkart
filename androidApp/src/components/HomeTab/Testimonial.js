import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {globalCss} from '../../Utils/CSS';
import {GLOBALCOLOR} from '../../Utils/globalColor';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';
import {Skeleton} from '@rneui/themed';

// import SkeletonContent from 'react-native-skeleton-content';
const Testimonial = ({reduxData}) => {
  // console.log(
  //   ' Testimonial redux - ',
  //   reduxData && reduxData[0].testimonialTestimonialDetails,
  // );

  return (
    <View>
      <View>
        <Text style={{textAlign: 'center'}}>Customer Testimonials</Text>
      </View>

      <View style={{marginTop: 10}}>
        <FlatList
          data={reduxData && reduxData[0].testimonialTestimonialDetails}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()} // Ensure a unique key
          renderItem={({item}) => {
            // console.log('item - ', item);
            return (
              <View style={{alignItems: 'center', marginRight: 10}}>
                <Image
                  source={{uri: item.imageSrc}}
                  alt={item.imageAlt}
                  style={{
                    width: '100%',
                    height: windowHeight / 1.5,
                    borderRadius: 10,
                  }}
                  resizeMode="cover"
                />
                <View style={{paddingHorizontal: 10, marginTop: 10}}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                    {item.customerName}
                  </Text>
                  <Text style={{textAlign: 'center', marginTop: 5}}>
                    {item.customerMsg}
                  </Text>
                </View>
              </View>
              // <View style={{}}>
              //   <Image
              //     source={{
              //       uri: item.imageSrc,
              //     }}
              //     alt={item.imageAlt}
              //     style={{
              //       width: windowWidth,
              //       width: '40%',
              //       // flex: 1,
              //       height: windowHeight / 1.5,
              //       borderRadius: 10,
              //     }}
              //     resizeMode="cover"
              //   />

              //   <View style={{paddingHorizontal: 20}}>
              //     <Text style={{textAlign: 'center'}}>
              //       {' '}
              //       {item.customerName}
              //     </Text>

              //     <Text style={{textAlign: 'center'}}> {item.customerMsg}</Text>
              //   </View>
              // </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Testimonial;

const styles = StyleSheet.create({});
