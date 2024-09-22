import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect} from 'react';
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

const OrderHistoryScreen = () => {
  const dispatch = useDispatch();

  const userDetailsRedux = useSelector(state => state.userAuth);

  // console.log('userDetailsRedux - ', userDetailsRedux?.userDetails);

  async function fetchData() {
    const response = await dispatch(getUserInfoAsync());
    // console.log('Res - ', response.payload);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const tableData = [
    {id: 1, name: 'John Doe', age: 28},
    {id: 2, name: 'Jane Smith', age: 34},
    {id: 3, name: 'Sam Wilson', age: 23},
    {id: 4, name: 'Anna Lee', age: 29},
    // Add more rows for testing performance
  ];
  // const renderItem = ({item}) => (
  //   <View style={styles.tableRow}>
  //     <Text style={styles.tableCell}>{item.id}</Text>
  //     <Text style={styles.tableCell}>{item.name}</Text>
  //     <Text style={styles.tableCell}>{item.age}</Text>
  //   </View>
  // );

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

          <Text
            style={{
              fontSize: 20,
              color: GLOBALCOLOR.black2,
              // backgroundColor: '#E5EBFC',
              fontFamily: 'Raleway-ExtraBold',
              padding: 5,
            }}>
            Order History
          </Text>
        </View>

        {/* body */}

        <View style={[styles.table, {marginTop: 10}]}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Order No</Text>
            <Text style={styles.tableHeader}>Date</Text>
            <Text style={styles.tableHeader}>Payment Status</Text>
            <Text style={styles.tableHeader}>Delivery Status</Text>
            <Text style={styles.tableHeader}>Total</Text>
            <Text style={styles.tableHeader}>No of Products</Text>
          </View>

          {(function () {
            try {
              const userCart =
                (
                  userDetailsRedux?.userDetails?.query &&
                  userDetailsRedux?.userDetails?.query[0]
                )?.clientAuthUserCart || [];
              // console.log('userCart - ', userCart); userDetailsRedux?.isLoading
              return userDetailsRedux?.isLoading ? (
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
                  ]}
                  renderItem={({item}) => {
                    return (
                      <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>
                          <SkeltonUi
                            circle={false}
                            height={10}
                            width={40}
                            style={{borderRadius: 5}}
                          />
                        </Text>
                        <Text style={styles.tableCell}>
                          <SkeltonUi
                            circle={false}
                            height={10}
                            width={40}
                            style={{borderRadius: 5}}
                          />
                        </Text>
                        <Text style={styles.tableCell}>
                          {' '}
                          <SkeltonUi
                            circle={false}
                            height={10}
                            width={30}
                            style={{borderRadius: 5}}
                          />
                        </Text>
                        <Text style={styles.tableCell}>
                          <SkeltonUi
                            circle={false}
                            height={10}
                            width={40}
                            style={{borderRadius: 5}}
                          />
                        </Text>
                        <Text style={styles.tableCell}>
                          <SkeltonUi
                            circle={false}
                            height={10}
                            width={40}
                            style={{borderRadius: 5}}
                          />
                        </Text>
                        <Text style={styles.tableCell}>
                          <SkeltonUi
                            circle={false}
                            height={10}
                            width={40}
                            style={{borderRadius: 5}}
                          />
                        </Text>
                      </View>
                    );
                  }}
                  // keyExtractor={item => item.id.toString()}
                />
              ) : (
                <FlatList
                  data={userCart}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => {
                    return (
                      <View style={styles.tableRow}>
                        <Text style={styles.tableCell} numberOfLines={3}>
                          {item?.orderId}
                        </Text>
                        <Text style={styles.tableCell} numberOfLines={1}>
                          {item?.updatedAt}
                        </Text>
                        <Text style={styles.tableCell}>{item?.status}</Text>
                        <Text style={styles.tableCell}>
                          {item?.deliveryStatus}
                        </Text>
                        <Text style={styles.tableCell}>
                          {' '}
                          {convertInInr(item?.cartAmount)}
                        </Text>
                        <Text style={styles.tableCell}>
                          {item?.userCartUserCartItem &&
                            item?.userCartUserCartItem.length}
                        </Text>
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

export default OrderHistoryScreen;

const styles = StyleSheet.create({
  table: {
    flexDirection: 'column',
    borderWidth: 0.5,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#000',
  },
  tableHeader: {
    flex: 1,
    padding: 5,
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    color: GLOBALCOLOR.black2,
    fontSize: 10,
    fontFamily: 'Raleway-ExtraBold',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    fontSize: 12,
    color: GLOBALCOLOR.black2,
    // backgroundColor: '#E5EBFC',
    fontFamily: 'Raleway-Medium',
  },
});
