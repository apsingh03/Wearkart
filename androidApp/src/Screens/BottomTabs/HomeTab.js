import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalCss} from '../../Utils/CSS';
import {GLOBALCOLOR} from '../../Utils/globalColor';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';
import BannerCarousel from '../../components/HomeTab/BannerCarousel';
import Banner1 from '../../components/HomeTab/Banner1';
import CategoriesCarousel from '../../components/HomeTab/CategoriesCarousel';
import ShopByCategory from '../../components/HomeTab/ShopByCategory';
import Testimonial from '../../components/HomeTab/Testimonial';
import {useSelector, useDispatch} from 'react-redux';
import {
  clientGetActressCarouselAsync,
  clientGetBannerCarouselAsync,
  clientGetFourBannerImagesAsync,
  clientGetTestimonialAsync,
} from '../../Redux/ClientSlices/clientProductSlice';
import {Skeleton} from '@rneui/themed';
import SkeltonUi from '../../components/SkeltonUi';
import LazyLoadingImage from '../../components/LazyLoadingImage';
import DebounceSearch from '../../components/DebounceSearch';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {checkInternetConnection} from '../../Utils/NetInfo';
import CheckInternetUi from '../../components/CheckInternetUi';
import useNetworkStatus from '../../customHooks/useNetworkStatus';
const HomeTab = ({navigation}) => {
  const dispatch = useDispatch();
  const loggedData = useSelector(state => state.userAuth.loggedData);

  const isConnected = useNetworkStatus();

  const bannerCarouselRedux = useSelector(
    state => state.client_product?.bannerCarousel?.query,
  );

  const actressCarouselRedux = useSelector(
    state => state.client_product?.actressCarousel?.query,
  );

  const fourBannerImagesRedux = useSelector(
    state => state.client_product?.fourBannerImages?.query,
  );

  const isLoadingFourBannerImagesRedux =
    !fourBannerImagesRedux || !fourBannerImagesRedux;

  // console.log(
  //   'isLoadingFourBannerImagesRedux - ',
  //   isLoadingFourBannerImagesRedux,
  // );

  const testimonialRedux = useSelector(
    state => state.client_product?.testimonial?.query,
  );
  // console.log('testimonialRedux - ', testimonialRedux);
  async function fetchData() {
    if (isConnected) {
      // Fetch data only when online
      await dispatch(clientGetBannerCarouselAsync());
      await dispatch(clientGetActressCarouselAsync());
      await dispatch(clientGetFourBannerImagesAsync());
      // await dispatch(clientGetTestimonialAsync());
    } else {
      // Handle offline case if needed, or just rely on Redux's state cache
      console.log('Offline: Fetching data from cache');
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
        {/* Header */}
        <View style={[globalCss.rowBetweenCenter, {width: '100%'}]}>
          <TouchableOpacity
            style={{width: '10%'}}
            onPress={() => navigation.openDrawer()}>
            <AntDesign name="menu-unfold" size={25} color="#545252" />
          </TouchableOpacity>
          <View style={{width: '30%'}}>
            <Text
              style={{
                fontSize: 20,
                color: GLOBALCOLOR.black2,
                fontFamily: 'Nunito-ExtraBold',
                fontWeight: 900,
                textAlign: 'center',
              }}>
              WearKart
            </Text>
          </View>
          <View style={{width: '60%'}}>
            <DebounceSearch />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <BannerCarousel
              reduxData={bannerCarouselRedux && bannerCarouselRedux}
            />
          </View>

          <View style={{marginTop: 10}}>
            <CategoriesCarousel
              reduxData={actressCarouselRedux && actressCarouselRedux}
            />
          </View>

          <View style={{marginTop: 20}}>
            {isLoadingFourBannerImagesRedux === true ? (
              <FlatList
                data={['', '', '', '']}
                scrollEnabled={false}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                columnWrapperStyle={{justifyContent: 'space-between'}} // Distribute items evenly
                renderItem={({item}) => {
                  // console.log('item - ', item);
                  return (
                    <View
                      style={{
                        marginBottom: 5,
                        flex: 1,
                        height: 200,
                        marginRight: 5,
                      }}>
                      <SkeltonUi circle={false} width={'100%'} height={200} />
                    </View>
                  );
                }}
              />
            ) : (
              <FlatList
                data={fourBannerImagesRedux}
                scrollEnabled={false}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                columnWrapperStyle={{justifyContent: 'space-between'}} // Distribute items evenly
                renderItem={({item}) => {
                  // console.log('item - ', item);
                  return (
                    <View
                      style={{
                        marginBottom: 5,
                        flex: 1,
                        height: 200,
                        marginRight: 5,
                      }}>
                      {/* <Image
                        source={{
                          uri:
                            item.imageSrc ||
                            'https://images.unsplash.com/photo-1617957743103-310accdfb999?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        }}
                        style={{
                          width: '100%',
                          height: 200,
                          borderRadius: 10,
                          padding: 5,
                        }}
                        resizeMode="cover"
                      /> */}
                      <LazyLoadingImage
                        uri={item.imageSrc}
                        width={'100%'}
                        height={200}
                        resizeMode="cover"
                        borderRadius={10}
                        padding={5}
                      />
                    </View>
                  );
                }}
              />
            )}
          </View>

          <View style={{marginTop: 10}}>{/* <ShopByCategory /> */}</View>

          <View style={{marginTop: 10}}>
            {/* <Testimonial reduxData={testimonialRedux && testimonialRedux} /> */}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  offlineText: {
    color: '#fff',
    // backgroundColor: '#0000',
    padding: 5,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Nunito',
  },
});
