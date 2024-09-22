import {StyleSheet, Text, View, TextInput, FlatList, Image} from 'react-native';
import React, {useEffect} from 'react';
import {GLOBALCOLOR} from '../../Utils/globalColor';
import {globalCss} from '../../Utils/CSS';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {clientAllListedProductsAsync} from '../../Redux/ClientSlices/clientProductSlice';

import {
  calculateProductDiscount,
  convertInInr,
} from '../../Utils/productDiscountCalculate';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SkeltonUi from '../../components/SkeltonUi';

const ProductsExploreTab = () => {
  const dispatch = useDispatch();
  const client_allProductsRedux = useSelector(
    state => state.client_product.allProducts,
  );

  const isLoadingClient_allProductsRedux =
    !client_allProductsRedux || !client_allProductsRedux?.query;

  // console.log(
  //   'client_allProductsRedux - ',
  //   isLoadingClient_allProductsRedux,
  //   client_allProductsRedux?.query,
  // );

  async function fetchData() {
    await dispatch(clientAllListedProductsAsync());
  }

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

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
      {/* product.isPublished === true && product.isRecycleBin === false */}
      <View style={{marginTop: 10, paddingHorizontal: 0}}>
        {isLoadingClient_allProductsRedux ? (
          <FlatList
            data={['', '', '', '', '', '', '', '', '', '']}
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
                  <SkeltonUi circle={false} width={'100%'} height={340} />
                </View>
              );
            }}
          />
        ) : (
          <FlatList
            data={
              client_allProductsRedux?.query && client_allProductsRedux?.query
            }
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              // console.log('item -', item);
              if (item.isPublished === true && item.isRecycleBin === false) {
                const sortedProductSizes = [
                  ...(item.productSizesProduct || []),
                ].sort((a, b) => a.mrp - b.mrp);

                // console.log('sortedProductSizes - ', sortedProductSizes);
                return (
                  <View
                    style={{
                      flex: 1,
                      // margin: 10, // Adds space between the items
                      // marginBottom : 10
                      marginRight: 5,
                      marginBottom: 10,
                      height: 340,
                    }}>
                    <View
                      style={{
                        padding: 5,
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        elevation: 5,
                        paddingBottom: 15,
                      }}>
                      <View style={{position: 'relative'}}>
                        <View
                          style={{
                            position: 'absolute',
                            top: 5,
                            right: 5,
                            zIndex: 1,
                          }}>
                          <MaterialIcons
                            size={25}
                            color={'#000'}
                            name="favorite"
                          />
                        </View>

                        <Image
                          source={{
                            uri: item.productImage.url1,
                          }}
                          style={{
                            width: '100%',
                            height: 200,
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                          }}
                          resizeMode="cover"
                          alt="Product Image"
                        />
                      </View>

                      <View style={{marginTop: 10, paddingHorizontal: 5}}>
                        <Text
                          numberOfLines={2}
                          style={{
                            fontSize: 14,
                            color: GLOBALCOLOR.black2,
                            fontFamily: 'Raleway-RegularBold',
                          }}>
                          {item?.id} {item?.name}
                        </Text>

                        <View style={[globalCss.flexRow, {marginTop: 10}]}>
                          {item?.productColorsProduct &&
                            item?.productColorsProduct.map((color, idx) => {
                              const colorName =
                                color?.productColorsColor?.name.toLowerCase();
                              return (
                                <View
                                  key={idx}
                                  style={{
                                    width: 15,
                                    height: 15,
                                    backgroundColor: colorName,
                                    borderRadius: 100,
                                    marginRight: 5,
                                    borderWidth: 1,
                                    borderColor: '#000',
                                  }}></View>
                              );
                            })}
                        </View>

                        <View style={[globalCss.flexRow, {marginTop: 10}]}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 12,
                              color: GLOBALCOLOR.black2,
                              fontFamily: 'Raleway-RegularBold',
                            }}>
                            Sizes{' - '}
                            {item?.productSizesProduct &&
                              item?.productSizesProduct.map((psize, idx) => {
                                return (
                                  <Text key={idx}>
                                    {psize?.pSizeProductSizes?.name}
                                    {' , '}
                                  </Text>
                                );
                              })}
                          </Text>
                        </View>

                        <View
                          style={[globalCss.flexRow, {gap: 10, marginTop: 5}]}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: GLOBALCOLOR.black2,
                              fontFamily: 'Raleway-Bold',
                            }}>
                            {calculateProductDiscount(
                              sortedProductSizes.length > 0
                                ? sortedProductSizes[0].mrp
                                : 0,
                              sortedProductSizes.length > 0
                                ? sortedProductSizes[0].discountPercent
                                : 0,
                            )}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: GLOBALCOLOR.black2,
                              fontFamily: 'Raleway-Bold',
                              textDecorationLine: 'line-through',
                            }}>
                            {convertInInr(
                              sortedProductSizes.length > 0
                                ? sortedProductSizes[0].mrp
                                : 0,
                            )}
                          </Text>

                          <Text
                            style={{
                              fontSize: 12,
                              color: '#B8001F',
                              fontFamily: 'Raleway-Bold',
                            }}>
                            {sortedProductSizes.length > 0
                              ? sortedProductSizes[0].discountPercent
                              : 0}
                            % Off
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }
            }}
          />
        )}
      </View>
    </View>
  );
};

export default ProductsExploreTab;

const styles = StyleSheet.create({});
