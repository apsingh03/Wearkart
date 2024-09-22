import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GLOBALCOLOR} from '../../Utils/globalColor';
import {globalCss} from '../../Utils/CSS';
import LazyLoadingImage from '../LazyLoadingImage';
import {
  calculateProductDiscount,
  convertInInr,
} from '../../Utils/productDiscountCalculate';

import {useDispatch, useSelector} from 'react-redux';
import {getUserInfoAsync} from '../../Redux/UserSlices/UserAuth';
import SkeltonUi from '../SkeltonUi';

import {
  deleteUserFavoriteProductAsync,
  getUserFavoriteProductAsync,
} from '../../Redux/UserSlices/FavoriteProduct/FavoriteProductSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const WishlistScreen = () => {
  const dispatch = useDispatch();

  const [isLoadingDeleteBtn, setisLoadingDeleteBtn] = useState({});

  const userDetailsRedux = useSelector(state => state.userAuth);

  const user_favoriteProductRedux = useSelector(
    state => state.user_favoriteProduct,
  );

  async function fetchData() {
    await dispatch(getUserFavoriteProductAsync());
  }

  async function handleRemoveBtn(id) {
    setisLoadingDeleteBtn(prev => ({
      ...prev,
      [id]: true,
    }));

    const actionResult = await dispatch(
      deleteUserFavoriteProductAsync({wishList_id: id}),
    );

    if (actionResult.payload?.msg === 'success') {
      setisLoadingDeleteBtn(prev => ({
        ...prev,
        [id]: false,
      }));
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: GLOBALCOLOR.white1,
          flex: 1,
          position: 'relative',
        }}>
        {/* Header */}
        <View style={[globalCss.flexRow, {gap: 10, alignItems: 'center'}]}>
          <View
            style={{
              height: 75,
              width: 75,
              borderRadius: 200,
              backgroundColor: '#ddd',
              padding: 8,
            }}>
            <LazyLoadingImage
              uri={
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
              width={'100%'}
              height={'100%'}
              resizeMode="cover"
              borderRadius={100}
            />
          </View>

          <View
            style={[
              globalCss.flexRow,
              {gap: 10, alignItems: 'center', justifyContent: 'center'},
            ]}>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: GLOBALCOLOR.black2,
                  fontFamily: 'Raleway-ExtraBold',

                  // padding: 5,
                }}>
                Wish list
              </Text>
            </View>
            <View
              style={{
                height: 35,
                width: 35,
                backgroundColor: '#ddd',
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: GLOBALCOLOR.black2,
                  fontFamily: 'Raleway-ExtraBold',
                }}>
                {' '}
                {user_favoriteProductRedux.data?.query?.length}{' '}
              </Text>
            </View>
          </View>
        </View>

        {/* body */}

        <View style={[{marginTop: 10}]}>
          {(function () {
            try {
              const wishListData = user_favoriteProductRedux?.data?.query;

              return userDetailsRedux?.isLoading ? (
                <FlatList
                  data={['', '', '', '']}
                  renderItem={({item}) => {
                    return (
                      <View
                        style={[
                          globalCss.flexRow,
                          {
                            marginBottom: 15,
                            width: '100%',
                            // borderBottomWidth: 1,
                            // borderColor: '#ddd',
                            paddingVertical: 10,
                            paddingHorizontal: 5,
                            backgroundColor: 'white',
                            elevation: 5,
                            borderRadius: 5,

                            // shadowColor: 'blue',
                          },
                        ]}>
                        {/* 40% Width Section */}
                        <View style={{width: '40%', paddingRight: 5}}>
                          <SkeltonUi
                            circle={false}
                            height={125}
                            width={'100%'}
                            style={{borderRadius: 5}}
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
                            // numberOfLines={2}
                          >
                            <SkeltonUi
                              circle={false}
                              height={10}
                              width={200}
                              style={{borderRadius: 10}}
                            />
                          </Text>

                          <Text>
                            <SkeltonUi
                              circle={false}
                              height={10}
                              width={100}
                              style={{borderRadius: 10}}
                            />
                          </Text>

                          <View style={{marginTop: 10}}>
                            <View
                              style={[
                                globalCss.rowBetweenCenter,
                                {paddingRight: 50},
                              ]}>
                              <View>
                                <SkeltonUi
                                  circle={false}
                                  height={25}
                                  width={25}
                                  style={{borderRadius: 200}}
                                />
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                  // keyExtractor={item => item.id.toString()}
                />
              ) : (
                <FlatList
                  data={wishListData}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => {
                    const sortedProductSizes = [
                      ...(item?.productUserFavoriteProduct
                        ?.productSizesProduct || []),
                    ].sort((a, b) => a.mrp - b.mrp);
                    return (
                      <View
                        style={[
                          globalCss.flexRow,
                          {
                            marginBottom: 15,
                            width: '100%',
                            // borderBottomWidth: 1,
                            // borderColor: '#ddd',
                            paddingVertical: 10,
                            paddingHorizontal: 5,
                            backgroundColor: 'white',
                            elevation: 5,
                            borderRadius: 5,

                            // shadowColor: 'blue',
                          },
                        ]}>
                        {/* 40% Width Section */}
                        <View style={{width: '40%', paddingRight: 5}}>
                          <LazyLoadingImage
                            uri={
                              item?.productUserFavoriteProduct?.productImage
                                ?.url1
                            }
                            width={'100%'}
                            height={125}
                            resizeMode="cover"
                            borderRadius={5}
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
                            // numberOfLines={2}
                          >
                            {item?.productUserFavoriteProduct &&
                              item?.productUserFavoriteProduct.name}
                          </Text>

                          <Text>
                            {' '}
                            {calculateProductDiscount(
                              sortedProductSizes[0]?.mrp,
                              sortedProductSizes[0]?.discountPercent,
                            )}
                          </Text>

                          <View style={{marginTop: 10}}>
                            <View
                              style={[
                                globalCss.rowBetweenCenter,
                                {paddingRight: 50},
                              ]}>
                              <View>
                                {isLoadingDeleteBtn[item.id] ? (
                                  <SkeltonUi
                                    circle={false}
                                    height={25}
                                    width={25}
                                    style={{borderRadius: 200}}
                                  />
                                ) : (
                                  <TouchableOpacity
                                    onPress={() => handleRemoveBtn(item?.id)}>
                                    <MaterialCommunityIcons
                                      name="delete"
                                      color={'#000'}
                                      size={25}
                                    />
                                  </TouchableOpacity>
                                )}
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                  keyExtractor={item => item.id.toString()}
                />
              );
            } catch (error) {
              console.log('Error - ', error);
            }
          })()}
        </View>
      </View>
    </>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({});
