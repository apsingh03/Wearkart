import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {clientGetSingleProductAsync} from '../../Redux/ClientSlices/clientProductSlice';

import {
  calculateProductDiscount,
  convertInInr,
} from '../../Utils/productDiscountCalculate';

import {
  createUserCartAsync,
  getUserCartAsync,
  // getUserCartAsync,
} from '../../Redux/UserSlices/Cart/UserCartRedux';
import SkeltonUi from '../../components/SkeltonUi';
import LazyLoadingImage from '../../components/LazyLoadingImage';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';
import {globalCss} from '../../Utils/CSS';
import {GLOBALCOLOR} from '../../Utils/globalColor';
// For HTML content rendering
import RenderHtml from 'react-native-render-html';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
const ProductDetailScreen = ({route, navigation}) => {
  const flatListRef = useRef(null);
  const defaultViewableItemsHandler = useRef(() => {}).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();

  const clientSingleProductRedux = useSelector(
    state => state.client_product?.singleProduct,
  );
  const isLoadingClientSingleProductRedux = useSelector(
    state => state.client_product?.isLoading,
  );

  const user_userCart = useSelector(state => state.user_userCart.data);
  // console.log('user_userCart - ', user_userCart);

  const clientIsLogged = useSelector(state => state.client_auth);

  const [isSubMenuToggle, setisSubMenuToggle] = useState({});
  const [selectSizeCodeId, setselectSizeCodeId] = useState();
  const [selectColorCodeId, setselectColorCodeId] = useState();

  const {productId} = route.params;

  async function fetchData() {
    // const {id} = route.params;

    // console.log('productId - ', productId);
    const productIdFromUrl = productId;
    // console.log('productIdFromUrl - ', productIdFromUrl);
    await dispatch(
      clientGetSingleProductAsync({
        id: 2,
      }),
    );

    await dispatch(getUserCartAsync());
  }
  const [isLoadingAddProductInCart, setisLoadingAddProductInCart] =
    useState(false);
  async function addProductInCart(id) {
    if (clientIsLogged === false) {
      alert('You Need to Login First');
    } else {
      if (selectColorCodeId === undefined) {
        Alert.alert('Please Select Color');
      } else if (selectSizeCodeId === undefined) {
        Alert.alert('Please Select Size');
      } else {
        setisLoadingAddProductInCart(true);
        const cartActionResult = await dispatch(
          createUserCartAsync({
            productId: id,
            color_id: selectColorCodeId,
            PSize_id: selectSizeCodeId,
          }),
        );

        setisLoadingAddProductInCart(false);

        if (cartActionResult.payload?.msg === 'success') {
          // toast.success("Item Added in Cart");
          Alert.alert('Item Added');
          navigation.navigate('CartTab');
        }

        if (cartActionResult.payload?.msg === 'Item Already Exist') {
          Alert.alert(cartActionResult.payload.msg);
        }
      }
    }
  }

  useEffect(() => {
    fetchData();

    // Clean up the event listener on component unmount
    return () => {};
  }, [productId]);

  const handleToggle = id => {
    setisSubMenuToggle(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Scroll to the selected dot
  const dotsScrollToIndex = index => {
    flatListRef.current?.scrollToIndex({index, animated: true});
    setActiveIndex(index);
  };

  // Update active index when scroll ends
  // const onViewableItemsChanged = useRef(({viewableItems}) => {
  //   // console.log('viewableItems - ', viewableItems);
  //   if (viewableItems.length > 0) {
  //     setActiveIndex(viewableItems[0].index);
  //   }
  // }).current;

  // Memoize the viewableItemsChanged handler to ensure it doesn't change between renders
  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }, []);

  const sortedProductSizes = [
    ...(clientSingleProductRedux?.query?.productSizesProduct || []),
  ].sort((a, b) => a.mrp - b.mrp);

  return (
    <View style={{flex: 1}}>
      {(function () {
        try {
          const productImages = [
            clientSingleProductRedux?.query?.productImage?.url1,
            clientSingleProductRedux?.query?.productImage?.url2,
            clientSingleProductRedux?.query?.productImage?.url3,
            clientSingleProductRedux?.query?.productImage?.url4,
            clientSingleProductRedux?.query?.productImage?.url5,
          ].filter(url => url); // Filter out any undefined URLs

          const dataForFlatList = isLoadingClientSingleProductRedux
            ? ['', '', '', '']
            : productImages;

          return (
            <>
              <View style={{position: 'relative'}}>
                <FlatList
                  data={dataForFlatList}
                  ref={flatListRef}
                  horizontal
                  pagingEnabled
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  viewabilityConfig={{
                    // This means that at least 50% of an item must be visible within the viewport before it is considered "viewable" by the FlatList.
                    viewAreaCoveragePercentThreshold: 50,
                  }}
                  onViewableItemsChanged={({viewableItems}) => {
                    if (viewableItems.length > 0) {
                      setActiveIndex(viewableItems[0].index);
                    }
                  }}
                  renderItem={({item}) => {
                    // console.log('item - ', item);
                    return isLoadingClientSingleProductRedux ? (
                      <>
                        <View
                          onPress={() => navigation.goBack()}
                          style={{
                            position: 'absolute',
                            top: 20,
                            left: 20,
                            zIndex: 1,
                          }}>
                          <SkeltonUi width={25} height={25} circle={false} />
                        </View>

                        <View style={{width: windowWidth}}>
                          <SkeltonUi
                            width={'100%'}
                            height={windowHeight / 2.5}
                            circle={false}
                          />
                          <View style={[styles.dotsContainer, {gap: 10}]}>
                            {['', '', '', ''].map((_, index) => (
                              <View key={index}>
                                <SkeltonUi
                                  width={10}
                                  height={10}
                                  circle={true}
                                />
                              </View>
                            ))}
                          </View>
                        </View>
                      </>
                    ) : (
                      <>
                        <TouchableOpacity
                          onPress={() => navigation.goBack()}
                          style={{
                            position: 'absolute',
                            top: 20,
                            left: 20,
                            zIndex: 1,
                          }}>
                          <Fontisto
                            name="arrow-left"
                            size={25}
                            color={'#202020'}
                          />
                        </TouchableOpacity>

                        <View style={{width: windowWidth}}>
                          <LazyLoadingImage
                            uri={item}
                            width={'100%'}
                            height={windowHeight / 2.5}
                            resizeMode="cover"
                            // borderRadius={100}
                          />
                        </View>
                      </>
                    );
                  }}
                />

                <View style={[styles.dotsContainer]}>
                  {productImages.map((_, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => dotsScrollToIndex(index)}>
                      <View
                        style={[
                          styles.dot,
                          {
                            width: index === activeIndex ? 20 : 10,
                            opacity: index === activeIndex ? 1 : 0.3,
                          },
                        ]}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View
                style={{
                  backgroundColor: GLOBALCOLOR.white1,
                  position: 'relative',
                  flex: 1,
                }}>
                {(function () {
                  return isLoadingClientSingleProductRedux ? (
                    <>
                      <ScrollView
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 0}} // Add padding to prevent content from hiding behind the button
                      >
                        <View
                          style={{
                            marginTop: 10,
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                          }}>
                          <SkeltonUi
                            width={'100%'}
                            height={20}
                            circle={false}
                            borderRadius={10}
                          />

                          <View
                            style={[
                              globalCss.rowBetweenCenter,
                              {marginTop: 20},
                            ]}>
                            <View>
                              <SkeltonUi
                                width={60}
                                height={10}
                                circle={false}
                              />
                            </View>

                            <View>
                              <SkeltonUi
                                width={60}
                                height={10}
                                circle={false}
                              />
                            </View>

                            <View>
                              <SkeltonUi
                                width={60}
                                height={10}
                                circle={false}
                              />
                            </View>
                          </View>

                          <View
                            style={[
                              globalCss.flexRow,
                              {
                                gap: 10,
                                alignItems: 'center',
                                marginTop: 20,
                              },
                            ]}>
                            <Text>
                              <SkeltonUi
                                width={100}
                                height={10}
                                circle={false}
                              />
                            </Text>
                            {(function () {
                              return ['', '', '', '', ''].map((_, sizeIdx) => {
                                return (
                                  <TouchableOpacity key={sizeIdx}>
                                    <SkeltonUi
                                      width={40}
                                      height={40}
                                      circle={true}
                                    />
                                  </TouchableOpacity>
                                );
                              });
                            })()}
                          </View>

                          <View>
                            <View style={[, {marginVertical: 10}]}>
                              <FlatList
                                data={['', '', '', '']}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item}) => {
                                  return (
                                    <View
                                      style={{
                                        marginTop: 20,
                                        marginLeft: 10,
                                      }}>
                                      <SkeltonUi
                                        width={windowWidth / 3}
                                        height={200}
                                        circle={false}
                                        borderRadius={20}
                                      />
                                    </View>
                                  );
                                }}
                              />
                            </View>
                          </View>

                          <View style={{marginTop: 20}}>
                            {(function () {
                              return (
                                <FlatList
                                  data={['', '', '', '']}
                                  scrollEnabled={false}
                                  keyExtractor={(item, index) =>
                                    index.toString()
                                  }
                                  renderItem={({item}) => (
                                    <View
                                      style={[
                                        // globalCss.flexRow,
                                        {
                                          marginBottom: 10,
                                          borderWidth: 1,
                                          borderColor: '#ddd',
                                          borderRadius: 5,
                                          padding: 10,
                                        },
                                      ]}>
                                      <TouchableOpacity
                                        style={[
                                          styles.cardHeader,
                                          globalCss.rowBetweenCenter,
                                        ]}>
                                        <View>
                                          <SkeltonUi
                                            width={100}
                                            height={10}
                                            circle={false}
                                          />
                                        </View>

                                        <View>
                                          <SkeltonUi
                                            width={30}
                                            height={30}
                                            circle={false}
                                          />
                                        </View>
                                      </TouchableOpacity>
                                    </View>
                                  )}
                                />
                              );
                            })()}
                          </View>
                        </View>
                      </ScrollView>

                      <View
                        style={{
                          marginTop: 10,
                          // position: 'absolute',
                          width: '100%',
                          // bottom: 0,
                          // height: 50,
                          // zIndex: 100,
                          // paddingHorizontal: 10,
                          // paddingVertical: 10,
                        }}>
                        <SkeltonUi width={'100%'} height={50} circle={false} />
                      </View>
                    </>
                  ) : (
                    <>
                      <ScrollView
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 0}} // Add padding to prevent content from hiding behind the button
                      >
                        <View
                          style={{
                            marginTop: 10,
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 20,
                              color: GLOBALCOLOR.black2,
                              fontFamily: 'Nunito-Bold',
                            }}
                            numberOfLines={3}>
                            {' '}
                            {clientSingleProductRedux?.query?.name}{' '}
                          </Text>

                          <View
                            style={[
                              globalCss.rowBetweenCenter,
                              {marginTop: 10},
                            ]}>
                            <Text style={[styles.pricesText, {color: 'green'}]}>
                              {calculateProductDiscount(
                                sortedProductSizes[0]?.mrp,
                                sortedProductSizes[0]?.discountPercent,
                              )}
                            </Text>

                            <Text style={[styles.pricesText, {}]}>
                              {convertInInr(sortedProductSizes[0]?.mrp)}
                            </Text>

                            <Text
                              style={[styles.pricesText, {color: '#B8001F'}]}>
                              {sortedProductSizes[0]?.discountPercent} % OFF
                            </Text>
                          </View>

                          <View
                            style={[
                              globalCss.flexRow,
                              {
                                gap: 10,
                                alignItems: 'center',
                                marginTop: 20,
                              },
                            ]}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: GLOBALCOLOR.black2,
                                fontFamily: 'Nunito-Bold',
                              }}>
                              Available Colors {' - '}
                            </Text>
                            {(function () {
                              // {
                              //   const selectedColor = [
                              //     ...product.productColorsProduct,
                              //   ].find(
                              //     color =>
                              //       color.productColorsColor.id === selectColorCodeId,
                              //   );
                              //   return (
                              //     <View style={{fontWeight: 'bold'}}>
                              //       {selectedColor?.productColorsColor?.name}
                              //     </View>
                              //   );
                              // }

                              return (
                                clientSingleProductRedux?.query
                                  ?.productColorsProduct &&
                                [
                                  ...clientSingleProductRedux?.query
                                    ?.productColorsProduct,
                                ]
                                  .sort((a, b) => a.id - b.id)
                                  .map((color, sizeIdx) => {
                                    return (
                                      <TouchableOpacity
                                        key={sizeIdx}
                                        onPress={() =>
                                          setselectColorCodeId(color?.color_id)
                                        }
                                        style={[
                                          {
                                            backgroundColor:
                                              color?.productColorsColor?.name.toLowerCase(),
                                            height: 40,
                                            width: 40,
                                            borderRadius: 100,
                                            borderWidth:
                                              selectColorCodeId ===
                                              color?.productColorsColor?.id
                                                ? 3
                                                : 1,
                                            borderColor: '#000',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                          },
                                        ]}
                                        title={color?.productColorsColor?.name}>
                                        <Text
                                          style={{
                                            // alignSelf: 'center',
                                            color: GLOBALCOLOR.black2,
                                            fontFamily: 'Nunito-Bold',
                                            fontSize: 8,
                                          }}>
                                          {color?.productColorsColor?.name}
                                        </Text>
                                      </TouchableOpacity>
                                    );
                                  })
                              );
                            })()}
                          </View>

                          <View>
                            <View style={[, {marginTop: 10}]}>
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: GLOBALCOLOR.black2,
                                  fontFamily: 'Nunito-Bold',
                                }}>
                                Available Sizes {' - '}
                              </Text>
                              {(function () {
                                const allSizes =
                                  clientSingleProductRedux?.query
                                    ?.productSizesProduct &&
                                  [
                                    ...clientSingleProductRedux?.query
                                      ?.productSizesProduct,
                                  ].sort((a, b) => a.mrp - b.mrp);

                                // console.log('allSizes - ', allSizes);

                                return (
                                  <FlatList
                                    data={allSizes}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({item}) => {
                                      // console.log('item - ', item);

                                      return (
                                        <TouchableOpacity
                                          activeOpacity={0.5}
                                          // style={[
                                          //   styles.sizeCard,
                                          //   selectSizeCodeId ===
                                          //     item.pSizeProductSizes.id && styles.selected,
                                          // ]}

                                          style={{
                                            borderWidth:
                                              selectSizeCodeId ===
                                              item.pSizeProductSizes.id
                                                ? 3
                                                : 1,
                                            borderColor: '#202020',
                                            marginLeft: 10,
                                            marginTop: 10,
                                            borderRadius: 10,
                                            padding: 5,
                                          }}
                                          onPress={() =>
                                            setselectSizeCodeId(item?.PSize_id)
                                          }>
                                          <View
                                            style={[
                                              {
                                                gap: 5,
                                              },
                                              globalCss.flexColumn,
                                            ]}>
                                            <Text
                                              style={styles.allSizesSizeCode}
                                              title="Size Code">
                                              {item?.pSizeProductSizes?.name}
                                            </Text>

                                            <Text
                                              style={styles.allSizesSizeQty}
                                              title="Product Quantity">
                                              Qty -
                                              {item?.pSizeProductSizes?.qty}
                                            </Text>

                                            <Text
                                              style={styles.allSizesSizeMrp}>
                                              Mrp -{' '}
                                              <Text style={styles.lineThrough}>
                                                {convertInInr(item?.mrp)}
                                              </Text>
                                            </Text>

                                            <Text
                                              style={
                                                styles.allSizesSizeDiscount
                                              }>
                                              {item?.discountPercent}% Off
                                            </Text>

                                            <Text
                                              style={
                                                styles.allSizesSizeDiscountPrice
                                              }>
                                              {calculateProductDiscount(
                                                item?.mrp,
                                                item?.discountPercent,
                                              )}
                                            </Text>
                                          </View>
                                        </TouchableOpacity>
                                      );
                                    }}
                                  />
                                );
                              })()}
                            </View>
                          </View>

                          <View
                            style={[
                              globalCss.rowBetweenCenter,
                              {marginTop: 20},
                            ]}>
                            <View
                              style={[
                                globalCss.colBetweenCenter,
                                {alignItems: 'center'},
                              ]}>
                              <FontAwesome
                                name="users"
                                size={30}
                                color="#202020"
                              />
                              <Text style={styles.title}>
                                1 Mn + Happy{'\n'}Customers
                              </Text>
                            </View>

                            <View
                              style={[
                                globalCss.colBetweenCenter,
                                {alignItems: 'center'},
                              ]}>
                              <FontAwesome
                                name="truck"
                                size={30}
                                color="#202020"
                              />
                              <Text style={styles.title}>
                                Free Shipping on{'\n'}Prepaid
                              </Text>
                            </View>

                            <View
                              style={[
                                globalCss.colBetweenCenter,
                                {alignItems: 'center'},
                              ]}>
                              <FontAwesome
                                name="calendar"
                                size={30}
                                color="#202020"
                              />
                              <Text style={styles.title}>
                                7 day Easy{'\n'}Returns
                              </Text>
                            </View>

                            <View
                              style={[
                                globalCss.colBetweenCenter,
                                {alignItems: 'center'},
                              ]}>
                              <AntDesign name="earth" size={30} color="#000" />
                              <Text style={styles.title}>
                                Global Delivery{'\n'}Available
                              </Text>
                            </View>
                          </View>

                          <View style={{marginTop: 20}}>
                            {(function () {
                              const data = [
                                {
                                  id: 1,
                                  name: 'Description',
                                  childData:
                                    clientSingleProductRedux?.query
                                      ?.description ||
                                    'No description available',
                                },
                                {
                                  id: 2,
                                  name: 'Size and Fit',
                                  childData:
                                    clientSingleProductRedux?.query
                                      ?.sizeAndFit ||
                                    'Size and fit details not available',
                                },
                                {
                                  id: 3,
                                  name: 'Fabric and Care',
                                  childData:
                                    clientSingleProductRedux?.query
                                      ?.fabricAndCare ||
                                    'Fabric and care details not available',
                                },
                                {
                                  id: 4,
                                  name: 'Shipping and Delivery',
                                  childData:
                                    '<ul><li>This is Shipping and Delivery 1</li><li>This is Shipping and Delivery 2</li></ul>',
                                },
                                {
                                  id: 5,
                                  name: 'More Information',
                                  childData:
                                    '<ul><li>This is More Information 1</li><li>This is More Information 2</li></ul>',
                                },
                              ];

                              return (
                                <FlatList
                                  data={data}
                                  scrollEnabled={false}
                                  keyExtractor={item => item.id.toString()}
                                  renderItem={({item}) => (
                                    <View
                                      style={[
                                        // globalCss.flexRow,
                                        {
                                          marginBottom: 10,
                                          borderWidth: 1,
                                          borderColor: '#ddd',
                                          borderRadius: 5,
                                          padding: 10,
                                        },
                                      ]}>
                                      <TouchableOpacity
                                        style={[
                                          styles.cardHeader,
                                          globalCss.rowBetweenCenter,
                                        ]}
                                        onPress={() => handleToggle(item.id)}>
                                        <Text
                                          style={styles.productDetailsCatName}>
                                          {item.name}
                                        </Text>
                                        <Text style={{marginLeft: 10}}>
                                          {isSubMenuToggle[item.id] ? (
                                            <SimpleLineIcons
                                              name="arrow-up"
                                              color={'#000'}
                                              size={18}
                                            />
                                          ) : (
                                            <SimpleLineIcons
                                              name="arrow-down"
                                              color={'#000'}
                                              size={18}
                                            />
                                          )}
                                        </Text>
                                      </TouchableOpacity>

                                      {isSubMenuToggle[item.id] && (
                                        <View style={styles.childContent}>
                                          {/* Render HTML content */}
                                          <RenderHtml
                                            contentWidth={30} // Set your content width as needed
                                            source={{html: item.childData}}
                                          />
                                        </View>
                                      )}
                                    </View>
                                  )}
                                />
                              );
                            })()}
                          </View>
                        </View>
                      </ScrollView>

                      <View
                        style={{
                          marginTop: 10,
                          // position: 'absolute',
                          width: '100%',
                          // bottom: 0,
                          // height: 50,
                          // zIndex: 100,
                          // paddingHorizontal: 10,
                          // paddingVertical: 10,
                        }}>
                        {(function () {
                          const userCartItems =
                            user_userCart?.query?.[0]?.userCartUserCartItem ||
                            [];

                          const alreadyInCart = userCartItems.some(data => {
                            return data.product_id === productId;
                          });

                          return alreadyInCart ? (
                            <TouchableOpacity
                              activeOpacity={0.8}
                              style={{
                                height: 50,
                                width: '100%',
                                backgroundColor: '#29282B',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#fff',
                                  fontFamily: 'Raleway-ExtraBold',
                                  textTransform: 'uppercase',
                                }}>
                                {' '}
                                Item Already in cart{' '}
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <>
                              {isLoadingAddProductInCart ? (
                                <SkeltonUi
                                  width={'100%'}
                                  height={50}
                                  circle={false}
                                />
                              ) : (
                                <TouchableOpacity
                                  disabled={isLoadingAddProductInCart}
                                  onPress={() => addProductInCart(productId)}
                                  activeOpacity={0.8}
                                  style={{
                                    height: 50,
                                    width: '100%',
                                    backgroundColor: '#29282B',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 20,
                                      color: '#fff',
                                      fontFamily: 'Raleway-ExtraBold',
                                      textTransform: 'uppercase',
                                    }}>
                                    {' '}
                                    Add to Cart{' '}
                                  </Text>
                                </TouchableOpacity>
                              )}
                            </>
                          );
                        })()}
                      </View>
                    </>
                  );
                })()}
              </View>
            </>
          );
        } catch (error) {
          console.log('Product Detail Screen Error - ', error);
        }
      })()}
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  pricesText: {
    fontSize: 16,
    color: GLOBALCOLOR.black2,
    fontFamily: 'Nunito-Bold',
  },

  allSizesSizeCode: {
    fontSize: 16,
    color: GLOBALCOLOR.black2,
    fontFamily: 'Nunito-Bold',
  },

  allSizesSizeQty: {
    fontSize: 12,
    color: GLOBALCOLOR.black2,
    fontFamily: 'Nunito-Bold',
  },

  allSizesSizeMrp: {
    fontSize: 14,
    color: GLOBALCOLOR.black2,
    fontFamily: 'Nunito-Bold',
  },

  allSizesSizeDiscount: {
    fontSize: 12,
    color: '#B8001F',
    fontFamily: 'Nunito-Bold',
  },

  allSizesSizeDiscountPrice: {
    fontSize: 14,
    color: 'green',
    fontFamily: 'Nunito-Bold',
  },

  productDetailsCatName: {
    fontSize: 14,
    color: GLOBALCOLOR.black2,
    fontFamily: 'Nunito-Bold',
  },

  container: {
    padding: 10,
  },
  sizeCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
  },
  selected: {
    borderColor: 'green',
    borderWidth: 2,
  },

  card: {
    // justifyContent: 'space-between',
    // alignItems: 'center',
    width: '25%', // Adjust this to control the width of each card
    backgroundColor: 'red',
    // padding: 10,
    borderRadius: 10,
  },
  title: {
    marginTop: 5,
    fontSize: 12,
    color: GLOBALCOLOR.black2,
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
  },

  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 50,
    bottom: 20,
    backgroundColor: '#ddd',
    padding: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
    marginHorizontal: 5,
  },
});
