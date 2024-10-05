import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GLOBALCOLOR} from '../../Utils/globalColor';
import {globalCss} from '../../Utils/CSS';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {
  clientAllListedProductsAsync,
  clientGetProductFiltersAsync,
  clientGetSizesFiltersAsync,
} from '../../Redux/ClientSlices/clientProductSlice';
import {
  createUserFavoriteProductAsync,
  deleteUserFavoriteProductAsync,
  getUserFavoriteProductAsync,
} from '../../Redux/UserSlices/FavoriteProduct/FavoriteProductSlice';
import {
  calculateProductDiscount,
  convertInInr,
} from '../../Utils/productDiscountCalculate';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SkeltonUi from '../../components/SkeltonUi';
import LazyLoadingImage from '../../components/LazyLoadingImage';
import BottomPopUp from '../../components/ExploreTab/BottomPopUp';
import {useProductsFilterFunctions} from '../../customHooks/ProductFilterCustomHook';
import DebounceSearch from '../../components/DebounceSearch';
import CheckInternetUi from '../../components/CheckInternetUi';
import useNetworkStatus from '../../customHooks/useNetworkStatus';

const ProductsExploreTab = ({navigation}) => {
  const dispatch = useDispatch();
  const isConnected = useNetworkStatus();
  const [whichProductForFavorite, setwhichProductForFavorite] = useState({});
  const [isLoadingWishList, setisLoadingWishList] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const client_allProductsRedux = useSelector(
    state => state.client_product.allProducts,
  );

  const isLoaderAllProducts = useSelector(
    state => state.client_product.isLoading,
  );

  const user_favoriteProductRedux = useSelector(
    state => state.user_favoriteProduct.data?.query,
  );

  const loggedData = useSelector(state => state.userAuth?.userDetails?.query);

  const isLoadingClient_allProductsRedux =
    !client_allProductsRedux || !client_allProductsRedux?.query;

  const {clearAllFilter, selectedFilters} = useProductsFilterFunctions();

  async function handleFavoriteBtn(id) {
    if (loggedData) {
      setisLoadingWishList(true);
      setwhichProductForFavorite(prevState => ({
        ...prevState,
        [id]: true,
      }));

      const actionResult = await dispatch(
        createUserFavoriteProductAsync({product_id: id}),
      );

      if (actionResult.payload?.msg === 'success') {
        setisLoadingWishList(false);
        setwhichProductForFavorite(prevState => ({
          ...prevState,
          [id]: false,
        }));
      }
    } else {
      alert('You Need to Login ');
    }
  }

  async function fetchData() {
    if (isConnected) {
      await dispatch(clientAllListedProductsAsync());
      await dispatch(getUserFavoriteProductAsync());
    }
  }

  useEffect(() => {
    fetchData(); // Initial fetch

    // Refetch data when network comes back online
    if (isConnected) {
      fetchData();
    }
  }, [isConnected]); // Trigger fetch whenever network status changes

  return (
    <>
      <CheckInternetUi />
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: GLOBALCOLOR.white1,
          flex: 1,
        }}>
        {/* Bottom Filters Popup  */}

        {isBottomSheetOpen ? (
          <BottomPopUp
            isBottomSheetOpen={isBottomSheetOpen}
            setIsBottomSheetOpen={setIsBottomSheetOpen}
          />
        ) : null}

        {/* Header */}
        <View style={[globalCss.rowBetweenCenter]}>
          <View style={{width: '30%'}}>
            <Text
              style={{
                fontSize: 24,
                color: GLOBALCOLOR.black2,
                fontFamily: 'Nunito-ExtraBold',
                fontWeight: 900,
              }}>
              WearKart
            </Text>
          </View>
          <View style={{width: '60%'}}>
            <DebounceSearch />
          </View>
          <View style={{width: '10%'}}>
            <TouchableOpacity
              onPress={() => setIsBottomSheetOpen(!isBottomSheetOpen)}>
              <Ionicons name="options-sharp" size={30} color={'#231F20'} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={globalCss.rowBetweenCenter}>
          <Text
            style={{
              fontSize: 14,
              color: GLOBALCOLOR.black2,
              fontFamily: 'Nunito-Bold',
              marginVertical: 20,
            }}>
            Total Products {' - '}
            {(client_allProductsRedux?.query &&
              client_allProductsRedux?.query.length) ||
              0}
          </Text>
          <TouchableOpacity onPress={() => clearAllFilter()}>
            <Text
              style={{
                fontSize: 14,
                color: GLOBALCOLOR.black2,
                fontFamily: 'Nunito-Bold',
                marginVertical: 20,
              }}>
              Clear All Filters
            </Text>
          </TouchableOpacity>
        </View>

        {/* product cards  */}

        <View style={{marginTop: 0, paddingHorizontal: 0}}>
          {isLoaderAllProducts ? (
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
              contentContainerStyle={{paddingBottom: 100}}
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
                        marginRight: 5,
                        marginBottom: 20,
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
                            {(function () {
                              const alreadyFavorite =
                                user_favoriteProductRedux &&
                                user_favoriteProductRedux.some(data => {
                                  return data.product_id === item?.id;
                                });

                              return alreadyFavorite ? (
                                <TouchableOpacity>
                                  <MaterialIcons
                                    size={25}
                                    color={'#000'}
                                    name="favorite"
                                  />
                                </TouchableOpacity>
                              ) : (
                                <>
                                  {whichProductForFavorite[item?.id] ? (
                                    isLoadingWishList ? (
                                      <ActivityIndicator
                                        size="small"
                                        color="#0000ff"
                                      />
                                    ) : null
                                  ) : (
                                    <TouchableOpacity
                                      onPress={() =>
                                        handleFavoriteBtn(item?.id)
                                      }>
                                      <MaterialIcons
                                        size={25}
                                        color={'#000'}
                                        name="favorite-border"
                                      />
                                    </TouchableOpacity>
                                  )}
                                </>
                              );
                            })()}
                          </View>
                          <Pressable
                            onPress={() =>
                              navigation.navigate('ProductDetailScreen', {
                                productId: item?.id,
                              })
                            }>
                            <LazyLoadingImage
                              uri={item?.productImage?.url1}
                              width={'100%'}
                              height={200}
                              resizeMode="cover"
                              // borderRadius={100}
                              borderTopLeftRadius={5}
                              borderTopRightRadius={5}
                            />
                          </Pressable>
                        </View>

                        <View style={{marginTop: 10, paddingHorizontal: 5}}>
                          <Text
                            numberOfLines={2}
                            style={{
                              fontSize: 14,
                              color: GLOBALCOLOR.black2,
                              fontFamily: 'Nunito-Bold',
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
                                fontFamily: 'Nunito-RegularBold',
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
                            style={[
                              globalCss.flexRow,
                              {gap: 10, marginTop: 5},
                            ]}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: GLOBALCOLOR.black2,
                                fontFamily: 'Nunito-Bold',
                              }}>
                              {calculateProductDiscount(
                                sortedProductSizes.length > 0
                                  ? sortedProductSizes[0]?.mrp
                                  : 0,
                                sortedProductSizes.length > 0
                                  ? sortedProductSizes[0]?.discountPercent
                                  : 0,
                              )}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                color: GLOBALCOLOR.black2,
                                fontFamily: 'Nunito-Bold',
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
                                fontFamily: 'Nunito-Bold',
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
    </>
  );
};

export default ProductsExploreTab;

const styles = StyleSheet.create({});
