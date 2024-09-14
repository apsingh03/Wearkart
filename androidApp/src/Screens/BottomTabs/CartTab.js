import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {globalCss} from '../../Utils/CSS';
import {GLOBALCOLOR} from '../../Utils/globalColor';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../components/CustomButton';

const CartTab = () => {
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
            fontSize: 28,
            color: GLOBALCOLOR.black2,
            fontFamily: 'Raleway-ExtraBold',
            marginRight: 10,
          }}>
          Cart
        </Text>
        <Text
          style={{
            fontSize: 25,
            color: GLOBALCOLOR.black2,
            backgroundColor: '#E5EBFC',
            fontFamily: 'Raleway-ExtraBold',
            padding: 5,
          }}>
          0
        </Text>
      </View>

      <View style={[globalCss.flexRow, {marginTop: 10, marginBottom: 110}]}>
        <FlatList
          data={[
            'item1',
            'item2',
            'item3',
            'item4',
            'item5',
            'item6',
            'item7',
            'item8',
          ]} // Replacing empty strings with valid data or text
          keyExtractor={(item, index) => index.toString()} // Ensure unique key for each item
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View
                style={[
                  globalCss.flexRow,
                  {
                    marginBottom: 10,
                    width: '100%',
                    // flexDirection: 'row', // Set horizontal direction for the row
                  },
                ]}>
                {/* 40% Width Section */}
                <View style={{width: '40%', paddingRight: 5}}>
                  <Image
                    source={{
                      uri: 'https://styleunion.in/cdn/shop/products/FT00144OFFWHITE_2.jpg?v=1693579109&width=2400',
                    }}
                    style={{width: '100%', height: 150, borderRadius: 5}}
                    resizeMethod="cover"
                  />
                </View>

                {/* 60% Width Section */}
                <View
                  style={[
                    globalCss.colBetweenCenter,
                    {width: '60%', paddingLeft: 5},
                  ]}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: GLOBALCOLOR.black2,
                      fontFamily: 'Raleway-ExtraBold',
                    }}
                    numberOfLines={2}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Cupiditate, soluta ratione? Temporibus, dolores fugit facere
                    enim ducimus quaerat nostrum placeat facilis voluptates,
                    saepe suscipit culpa voluptatum. Corporis quasi itaque
                    illum!
                  </Text>

                  <Text
                    style={{
                      fontSize: 14,
                      color: GLOBALCOLOR.black2,
                      fontFamily: 'Raleway-ExtraBold',
                    }}>
                    Pink Size M
                  </Text>

                  <View style={[globalCss.rowBetweenCenter]}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: GLOBALCOLOR.black2,
                        fontFamily: 'Raleway-ExtraBold',
                      }}>
                      $ 100
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: GLOBALCOLOR.black2,
                        fontFamily: 'Raleway-ExtraBold',
                      }}>
                      100 %
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: GLOBALCOLOR.black2,
                        fontFamily: 'Raleway-ExtraBold',
                        marginRight: 10,
                      }}>
                      $ 90
                    </Text>
                  </View>

                  <View style={{marginTop: 10}}>
                    <View style={[globalCss.flexRow, {gap: 10}]}>
                      <Pressable
                        // onPress={() => handleIncrease()}
                        // onPressIn={() => setIsPressed(true)}
                        // onPressOut={() => setIsPressed(false)}
                        style={({pressed}) => [
                          // {backgroundColor: pressed ? 'lightgray' : 'red'},
                          // styles.button,
                        ]}>
                        <AntDesign
                          name="minuscircleo"
                          size={25}
                          color={'#000'}
                        />
                      </Pressable>
                      <Text
                        style={{
                          fontSize: 14,
                          color: GLOBALCOLOR.black2,
                          fontFamily: 'Raleway-ExtraBold',
                        }}>
                        $90
                      </Text>
                      <Pressable
                        // onPress={() => handleIncrease()}
                        // onPressIn={() => setIsPressed(true)}
                        // onPressOut={() => setIsPressed(false)}
                        style={({pressed}) => [
                          // {backgroundColor: pressed ? 'lightgray' : 'red'},
                          // styles.button,
                        ]}>
                        <AntDesign
                          name="pluscircleo"
                          size={25}
                          color={'#000'}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>

      <View
        style={[
          globalCss.rowBetweenCenter,
          {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 10,
            backgroundColor: '#ddd',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}>
        <Text> Total $1000 </Text>

        <CustomButton
          title="Checkout"
          // onPress
          // width,
          height={50}
          backgroundColor="blue"
          textColor="#fff"
          fontFamily="Roboto"
          fontSize={16}
          titleWeight={500}
        />
      </View>
    </View>
  );
};

export default CartTab;

const styles = StyleSheet.create({});
