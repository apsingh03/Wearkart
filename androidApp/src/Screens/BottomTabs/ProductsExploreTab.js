import {StyleSheet, Text, View, TextInput, FlatList, Image} from 'react-native';
import React from 'react';
import {GLOBALCOLOR} from '../../Utils/globalColor';
import {globalCss} from '../../Utils/CSS';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProductsExploreTab = () => {
  return (
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
              paddingHorizontal: 20,
              paddingVertical: 5,
              width: windowWidth * 0.6, // Set width to 60% of the screen width
              borderRadius: 30, // Optional: Add border radius for smooth edges
            }}
            placeholder="Search"
            placeholderTextColor="#202020"
            keyboardType="default"
            secureTextEntry={false}
          />
        </View>
        <View>
          <Ionicons name="options-sharp" size={30} color={'#231F20'} />
        </View>
      </View>

      {/* product cards  */}

      <View style={{marginTop: 10}}>
        <FlatList
          data={[
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
          ]}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  flex: 1,
                  margin: 5, // Adds space between the items
                }}>
                <View
                  style={{
                    padding: 5,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    elevation: 5,
                  }}>
                  <Image
                    source={{
                      uri: 'https://styleunion.in/cdn/shop/products/FT00144OFFWHITE_2.jpg?v=1693579109&width=2400', // Replace with actual image URL from API data
                    }}
                    style={{width: '100%', height: 200, borderRadius: 5}}
                    resizeMethod="cover"
                  />
                </View>

                <View style={{marginTop: 10}}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 14,
                      color: GLOBALCOLOR.black2,
                      fontFamily: 'Raleway-RegularBold',
                    }}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Facilis esse magni corrupti maiores! Consequatur cum
                    accusantium ipsam inventore esse consequuntur, eligendi
                    totam magni quia optio nobis sint molestiae placeat
                    repellat! {/* Replace with actual title from API */}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: GLOBALCOLOR.black2,
                      fontFamily: 'Raleway-Bold',
                    }}>
                    $ 100
                    {/* Replace with actual price from API */}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default ProductsExploreTab;

const styles = StyleSheet.create({});
