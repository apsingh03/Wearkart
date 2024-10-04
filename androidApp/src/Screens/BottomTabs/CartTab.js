import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalCss} from '../../Utils/CSS';
import {GLOBALCOLOR} from '../../Utils/globalColor';
// import {windowHeight, windowWidth} from '../../Utils/Dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteUserCartAsync,
  getUserCartAsync,
  updateUserCartQtyAsync,
} from '../../Redux/UserSlices/Cart/UserCartRedux';
import {
  calculateProductDiscount,
  convertInInr,
} from '../../Utils/productDiscountCalculate';
import SkeltonUi from '../../components/SkeltonUi';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused} from '@react-navigation/native';
import {BACKENDHOSTNAME, RAZOR_KEY_ID} from '@env';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import LazyLoadingImage from '../../components/LazyLoadingImage';

const CartTab = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [isDisabledCartIncreaseBtn, setisDisabledCartIncreaseBtn] = useState(
    {},
  );

  const [isDisabledCartDecreaseBtn, setisDisabledCartDecreaseBtn] = useState(
    {},
  );

  const [isLoadingDeleteBtn, setisLoadingDeleteBtn] = useState({});
  const [isLoadingPaymentGateway, setIsLoadingPaymentGateway] = useState(false);

  const user_userCart = useSelector(state => state.user_userCart.data);

  const isLoadingUser_userCart = useSelector(
    state => state.user_userCart.isLoading,
  );

  const loggedData = useSelector(state => state.userAuth.token);
  // console.log('loggedData - ', loggedData);

  const [calculateTotalCartMrp, setcalculateTotalCartMrp] = useState(0);
  const [calculateTotalCartAfterDiscount, setcalculateTotalCartAfterDiscount] =
    useState(0);

  async function fetchData() {
    if (loggedData !== null) {
      await dispatch(getUserCartAsync());
      // console.log('calling fetchData');
    }
  }

  async function handleRemoveBtn(cart_id, cartItem_id) {
    // setisLoadingTopProgress(30);
    setisLoadingDeleteBtn(prev => ({
      ...prev,
      [cartItem_id]: true,
    }));
    // console.log('delete func -  ', cart_id, cartItem_id);
    const response = await dispatch(
      deleteUserCartAsync({cart_id, cartItem_id}),
    );
    setisLoadingDeleteBtn(prev => ({
      ...prev,
      [cartItem_id]: false,
    }));
  }

  async function handleCartQty(
    cartItem_id,
    qtyMessage,
    userCartItemQty,
    productStockQty,
  ) {
    if (qtyMessage === 'Decrease' && userCartItemQty <= 1) {
      alert("You can't less it");
    } else if (
      qtyMessage === 'Increase' &&
      userCartItemQty >= productStockQty
    ) {
      alert("You can't add more than stock qty");
    } else {
      // console.log(cartItem_id, qtyMessage);

      if (qtyMessage === 'Increase') {
        // setisDisabledCartIncreaseBtn(true);
        setisDisabledCartIncreaseBtn(prev => ({
          ...prev,
          [cartItem_id]: true,
        }));
      }

      if (qtyMessage === 'Decrease') {
        setisDisabledCartDecreaseBtn(prev => ({
          ...prev,
          [cartItem_id]: true,
        }));
      }

      const actionResult = await dispatch(
        updateUserCartQtyAsync({cartItem_id, qtyMessage}),
      );
      if (
        actionResult.payload?.msg &&
        actionResult.payload?.msg === 'success'
      ) {
        const {qtyMessage} = actionResult.meta.arg;

        if (qtyMessage === 'Increase') {
          setisDisabledCartIncreaseBtn(prev => ({
            ...prev,
            [cartItem_id]: false,
          }));
        }

        if (qtyMessage === 'Decrease') {
          setisDisabledCartDecreaseBtn(prev => ({
            ...prev,
            [cartItem_id]: false,
          }));
        }
        // console.log('actionResult - ', qtyMessage, actionResult);
      }
    }

    // setisLoadingTopProgress(100);
  }

  useEffect(() => {
    // isFocused
    if (loggedData !== null && isFocused) {
      fetchData();
    } else {
      // Alert.alert('You Need to LogIn First');
      console.log('You Need to LogIn First');
    }
    // console.log('Mounted Carttab', isFocused);

    return () => {
      // console.log('Unmounted Cart tab', isFocused);
    };
  }, [isFocused]);

  const userCartItems = user_userCart?.query?.[0]?.userCartUserCartItem || [];

  // console.log('loading - ', isLoadingUser_userCart, userCartItems);

  useEffect(() => {
    // calculation total carts amount
    let newTotalCartMrp = 0;
    let newTotalCartAfterDiscount = 0;

    userCartItems.forEach(item => {
      const matchingSize = item.productUserCartItem.productSizesProduct.find(
        size => size.PSize_id === item.PSize_id,
      );

      if (matchingSize) {
        newTotalCartMrp += matchingSize.mrp * item.qty;
        newTotalCartAfterDiscount +=
          (matchingSize.mrp * item.qty * matchingSize.discountPercent) / 100;
      }
    });

    // Update state after the entire list is processed
    setcalculateTotalCartMrp(newTotalCartMrp);
    setcalculateTotalCartAfterDiscount(newTotalCartAfterDiscount);
  }, [userCartItems]); // Recalculate totals when the cart items change

  const userAuthToken = useSelector(state => state.userAuth.token);
  const userEmail =
    useSelector(state => state.userAuth?.userDetails?.query[0]?.email) ||
    'Test Email';
  const userFullName =
    useSelector(state => state.userAuth?.userDetails?.query[0]?.fullName) ||
    'Test Full Name';

  const displayRazorpay = async () => {
    try {
      setIsLoadingPaymentGateway(true);

      const HOSTNAME = BACKENDHOSTNAME;
      // console.log('------ 1 ----------------');
      // Fetch order details from your backend

      const response = await axios.get(`${HOSTNAME}/purchase/buy/`, {
        headers: {Authorization: `${userAuthToken}`},
      });
      // console.log('------ 2 ----------------');
      const {order} = response.data;

      const options = {
        key: RAZOR_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Clothing Booking App',
        description: 'Test Transaction',
        order_id: order.id,
        prefill: {
          name: userEmail,
          email: userFullName,
        },
        theme: {
          color: '#3399cc',
        },
      };

      // console.log('------ 3 ----------------');

      // Open Razorpay checkout
      RazorpayCheckout.open(options)
        .then(async data => {
          // Handle successful payment
          const updateTxnAction = await axios.put(
            `${HOSTNAME}/purchase/updateCartstatus/`,
            {
              cartAmount: order.amount / 100,
              order_id: options.order_id,
              payment_id: data.razorpay_payment_id,
              paymentStatus: 'SUCCESSFUL',
            },
            {
              headers: {Authorization: `Bearer ${userToken}`},
            },
          );
          // console.log('------ 4 ----------------');
          if (updateTxnAction.data?.message === 'Transaction successful') {
            setIsLoadingPaymentGateway(false);
            Alert.alert('Success', 'Transaction completed successfully!');
            // Navigate to account or desired screen
            // e.g. navigation.replace('Account');
          }
        })
        .catch(async error => {
          // Handle failed payment
          const updateTxnAction = await axios.put(
            `${HOSTNAME}/purchase/updateCartstatus/`,
            {
              order_id: options.order_id,
              payment_id: error?.error?.payment_id || '',
              paymentStatus: 'FAILED',
            },
            {
              headers: {Authorization: `Bearer ${userToken}`},
            },
          );
          // console.log('------ 5 ----------------');

          if (updateTxnAction.data?.message === 'Transaction Failed') {
            setIsLoadingPaymentGateway(false);
            Alert.alert('Failure', 'Payment failed. Something went wrong.');
          }
        });
    } catch (error) {
      setIsLoadingPaymentGateway(false);
      Alert.alert('Display RazorPay Error', error.message);
      console.log('Display RazorPay  Gateway - ', error.message);
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#fff',
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
            // padding: 5,
            borderRadius: 100,
            height: 40,
            width: 40,
            textAlign: 'center',
          }}>
          {userCartItems?.length}
        </Text>
      </View>

      {(function () {
        try {
          return (
            <View
              style={[globalCss.flexRow, {marginTop: 10, marginBottom: 110}]}>
              {isLoadingUser_userCart ? (
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
                    <SkeltonUi
                      circle={false}
                      height={150}
                      width={'100%'}
                      style={{borderRadius: 10}}
                    />
                  </View>

                  {/* 60% Width Section */}
                  <View
                    style={[
                      globalCss.colBetweenCenter,
                      {width: '60%', paddingLeft: 5},
                    ]}>
                    <SkeltonUi
                      circle={false}
                      // height={150}
                      width={'100%'}
                    />
                    <View style={globalCss.rowBetweenCenter}>
                      <SkeltonUi
                        circle={false}
                        // height={150}
                        width={100}
                      />

                      <SkeltonUi
                        circle={false}
                        // height={150}
                        width={100}
                        style={{borderRadius: 10}}
                      />
                    </View>

                    <View style={[globalCss.rowBetweenCenter]}>
                      <SkeltonUi
                        circle={false}
                        // height={150}
                        width={'100%'}
                      />
                    </View>

                    <View style={{marginTop: 10}}>
                      <View style={[globalCss.flexRow, {gap: 10}]}>
                        <SkeltonUi
                          circle={false}
                          height={25}
                          width={25}
                          style={{borderRadius: 200}}
                        />
                        <SkeltonUi circle={false} height={25} width={25} />
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
              ) : (
                (function () {
                  if (userCartItems.length > 0) {
                    return (
                      <FlatList
                        data={userCartItems} // Replacing empty strings with valid data or text
                        keyExtractor={(item, index) => index.toString()} // Ensure unique key for each item
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => {
                          const matchingSize =
                            item.productUserCartItem.productSizesProduct.find(
                              size => size.PSize_id === item.PSize_id,
                            );

                          const matchingColor =
                            item.productUserCartItem.productColorsProduct.find(
                              color => color.color_id === item.color_id,
                            );

                          // console.log('matchingSize - ', matchingSize);

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
                                    item?.productUserCartItem?.productImage
                                      ?.url1
                                  }
                                  width={'100%'}
                                  height={150}
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
                                <Pressable
                                  onPress={() =>
                                    navigation.navigate('ProductDetailScreen', {
                                      productId: item?.id,
                                    })
                                  }>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: GLOBALCOLOR.black2,
                                      fontFamily: 'Nunito-ExtraBold',
                                    }}
                                    numberOfLines={2}>
                                    {item?.id} {item?.productUserCartItem?.name}
                                  </Text>
                                </Pressable>

                                <View style={globalCss.rowBetweenCenter}>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: GLOBALCOLOR.black2,
                                      fontFamily: 'Nunito-ExtraBold',
                                    }}>
                                    Color {' - '}
                                    {matchingColor &&
                                      matchingColor.productColorsColor.name}
                                  </Text>

                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: GLOBALCOLOR.black2,
                                      fontFamily: 'Nunito-ExtraBold',
                                    }}>
                                    Size {' - '}
                                    {matchingSize &&
                                      matchingSize.pSizeProductSizes.name}
                                  </Text>
                                </View>

                                <View style={[globalCss.rowBetweenCenter]}>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: '#008000',
                                      fontFamily: 'Nunito-ExtraBold',
                                    }}>
                                    {matchingSize &&
                                      calculateProductDiscount(
                                        matchingSize.mrp,
                                        matchingSize.discountPercent,
                                      )}
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: GLOBALCOLOR.black2,
                                      fontFamily: 'Nunito-ExtraBold',
                                    }}>
                                    Mrp {' - '}
                                    <Text
                                      style={{
                                        textDecorationLine: 'line-through',
                                        color: '#900000',
                                      }}>
                                      {' '}
                                      {convertInInr(
                                        matchingSize && matchingSize.mrp,
                                      )}
                                    </Text>
                                  </Text>
                                </View>

                                <View style={{marginTop: 10}}>
                                  <View
                                    style={[
                                      globalCss.rowBetweenCenter,
                                      {paddingRight: 50},
                                    ]}>
                                    <View
                                      style={[globalCss.flexRow, {gap: 10}]}>
                                      {isDisabledCartDecreaseBtn[item?.id] ? (
                                        <SkeltonUi
                                          circle={false}
                                          height={25}
                                          width={25}
                                          style={{borderRadius: 200}}
                                        />
                                      ) : (
                                        <TouchableOpacity
                                          disabled={
                                            isDisabledCartDecreaseBtn[item?.id]
                                          }
                                          onPress={() =>
                                            handleCartQty(
                                              item?.id,
                                              'Decrease',
                                              item?.qty,
                                              matchingSize?.pSizeProductSizes
                                                ?.qty,
                                            )
                                          }>
                                          <AntDesign
                                            name="minuscircleo"
                                            size={25}
                                            color={'#000'}
                                          />
                                        </TouchableOpacity>
                                      )}

                                      <Text
                                        style={{
                                          fontSize: 14,
                                          color: GLOBALCOLOR.black2,
                                          fontFamily: 'Raleway-ExtraBold',
                                        }}>
                                        {item?.qty}
                                      </Text>
                                      {isDisabledCartIncreaseBtn[item?.id] ? (
                                        <SkeltonUi
                                          circle={false}
                                          height={25}
                                          width={25}
                                          style={{borderRadius: 200}}
                                        />
                                      ) : (
                                        <TouchableOpacity
                                          disabled={
                                            isDisabledCartIncreaseBtn[item?.id]
                                          }
                                          onPress={() =>
                                            handleCartQty(
                                              item?.id,
                                              'Increase',
                                              item?.qty,
                                              matchingSize?.pSizeProductSizes
                                                ?.qty,
                                            )
                                          }>
                                          <AntDesign
                                            name="pluscircleo"
                                            size={25}
                                            color={'#000'}
                                          />
                                        </TouchableOpacity>
                                      )}
                                    </View>

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
                                          onPress={() =>
                                            handleRemoveBtn(
                                              item.cart_id,
                                              item.id,
                                            )
                                          }>
                                          <MaterialCommunityIcons
                                            name="delete"
                                            color={'#000'}
                                            size={20}
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
                      />
                    );
                  } else {
                    return (
                      <View style={[globalCss.flexColumn, {flex: 1}]}>
                        <Text
                          style={{
                            fontSize: 30,
                            color: GLOBALCOLOR.black2,
                            fontFamily: 'Nunito-Bold',
                          }}>
                          Cart is Empty
                        </Text>
                      </View>
                    );
                  }
                })()
              )}
            </View>
          );
        } catch (error) {
          console.log('Error - ', error.message);
        }
      })()}

      <View
        style={[
          globalCss.rowBetweenCenter,
          {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 10,
            backgroundColor: '#F5F5F5',
          },
        ]}>
        <Text
          style={{
            fontSize: 14,
            color: '#900000',
            fontFamily: 'Nunito-ExtraBold',
          }}>
          Mrp {' - '}
          <Text style={{textDecorationLine: 'line-through'}}>
            {' '}
            {convertInInr(calculateTotalCartMrp)}{' '}
          </Text>
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#008000',
            fontFamily: 'Nunito-ExtraBold',
          }}>
          Total{' - '}
          {convertInInr(
            calculateTotalCartMrp - calculateTotalCartAfterDiscount,
          )}
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => displayRazorpay()}
          style={{
            backgroundColor: '#004CFF',
            color: '#fff',
            padding: 15,
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <Text style={{color: '#fff', fontSize: 16}}>Check Out</Text>
          {isLoadingPaymentGateway ? (
            <View>
              <ActivityIndicator size="small" color="#ffff" />
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartTab;

const styles = StyleSheet.create({});
