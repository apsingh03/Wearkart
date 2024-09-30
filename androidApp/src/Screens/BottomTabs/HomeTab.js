import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
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

const HomeTab = () => {
  const dispatch = useDispatch();
  const loggedData = useSelector(state => state.userAuth.loggedData);

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
    await dispatch(clientGetBannerCarouselAsync());
    await dispatch(clientGetActressCarouselAsync());
    await dispatch(clientGetFourBannerImagesAsync());
    await dispatch(clientGetTestimonialAsync());
  }

  useEffect(() => {
    console.log('Home Tab');
    fetchData();

    return () => {};
  }, []);

  return (
    <>
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
                fontFamily: 'Nunito-ExtraBold',
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
                padding: 5,
                width: windowWidth * 0.7, // Set width to 60% of the screen width
                borderRadius: 30, // Optional: Add border radius for smooth edges
              }}
              placeholder="Search"
              placeholderTextColor="#202020"
              keyboardType="default"
              secureTextEntry={false}
            />
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

          <View style={{marginTop: 10}}>
            <ShopByCategory />
          </View>

          <View style={{marginTop: 10}}>
            {/* <Testimonial reduxData={testimonialRedux && testimonialRedux} /> */}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default HomeTab;

const styles = StyleSheet.create({});
