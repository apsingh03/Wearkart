import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {GLOBALCOLOR} from '../../Utils/globalColor';
import {globalCss} from '../../Utils/CSS';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';

const ShopByCategory = () => {
  return (
    <View>
      <View style={{}}>
        <Text
          style={{
            fontSize: 20,
            color: GLOBALCOLOR.black2,
            fontFamily: 'Raleway-Bold',
            textAlign: 'center',
          }}>
          Shop By Category
        </Text>
      </View>

      <View style={{marginTop: 10}}>
        <View style={[globalCss.flexRowCenter]}>
          <Text
            style={[
              styles.allCategoryTitles,
              {borderBottomWidth: 1, borderBottomColor: '#000'},
            ]}>
            {' '}
            Title 1{' '}
          </Text>
          <Text style={styles.allCategoryTitles}> Title 2 </Text>
        </View>

        <View style={{marginTop: 10}}>
          <FlatList
            data={['', '', '', '', '', '', '', '', '', '', '', '']}
            horizontal
            renderItem={({item}) => {
              return (
                <View style={{marginRight: 10}}>
                  <View>
                    <Image
                      source={{
                        uri: 'https://rukminim2.flixcart.com/image/832/832/xif0q/dress/z/s/i/s-a1-zwerlon-original-imagn9uycxbhshur.jpeg?q=70&crop=false',
                      }}
                      style={{width: 150, height: 250, borderRadius: 5}}
                      resizeMethod="contain"
                    />
                  </View>

                  <View
                    style={[
                      globalCss.flexColumn,
                      {marginTop: 5, justifyContent: 'flex-start'},
                    ]}>
                    <Text style={styles.allCategoryTitles}> T-shirt </Text>
                    <View style={[globalCss.flexRow, {}]}>
                      <Text style={styles.allCategoryTitles}> 1000 rs </Text>
                      <Text style={styles.allCategoryTitles}> 1000 rs </Text>
                      <Text style={styles.allCategoryTitles}> 1000 rs </Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ShopByCategory;

const styles = StyleSheet.create({
  allCategoryTitles: {
    fontSize: 16,
    color: GLOBALCOLOR.black2,
    fontFamily: 'Raleway-Bold',
    textAlign: 'center',
  },
});
