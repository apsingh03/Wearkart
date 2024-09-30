import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');

import SkeltonUi from '../SkeltonUi';
import LazyLoadingImage from '../LazyLoadingImage';

const Carousel = ({reduxData}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  // Auto-scroll logic using setInterval
  useEffect(() => {
    // console.log('BannerCarousel.js');
    //   const interval = setInterval(() => {
    //     const nextIndex = (activeIndex + 1) % images.length;
    //     flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
    //     setActiveIndex(nextIndex);
    //   }, 3000); // 3 seconds interval
    //   return () => clearInterval(interval); // Cleanup on component unmount
  }, [activeIndex]);

  // Update active index when scroll ends
  const onViewableItemsChanged = useRef(({viewableItems}) => {
    // console.log('viewableItems - ', viewableItems);
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  // Scroll to the selected dot
  const dotsScrollToIndex = index => {
    flatListRef.current?.scrollToIndex({index, animated: true});
    setActiveIndex(index);
  };

  const isLoading =
    !reduxData || !reduxData[0]?.bannerCarouselBannerCarouselImages;

  return (
    <View style={{marginTop: -10}}>
      {isLoading ? (
        <SkeltonUi circle={false} flex={1} height={200} />
      ) : (
        <>
          <FlatList
            ref={flatListRef}
            data={reduxData && reduxData[0].bannerCarouselBannerCarouselImages}
            horizontal
            pagingEnabled
            renderItem={({item}) => {
              // console.log('Item - ', item);
              return (
                <>
                  <View style={styles.carouselItem}>
                    <LazyLoadingImage
                      uri={item?.imageSrc}
                      width={'100%'}
                      height={200}
                      resizeMode="contain"
                      borderRadius={10}
                    />
                  </View>
                </>
              );
            }}
            // The keyExtractor ensures that each item in the FlatList has a unique identifier (key),
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{
              // This means that at least 50% of an item must be visible within the viewport before it is considered "viewable" by the FlatList.
              viewAreaCoveragePercentThreshold: 50,
            }}
            // initialNumToRender={1} //  Only renders the first item initially to save memory.
            // Limits how many items are rendered at once to reduce memory consumption.
            // maxToRenderPerBatch={2}
            // Sets the window size to pre-render a few items around the current one to keep
            // the scroll smooth without rendering too many items.
            // windowSize={2}
            //  Pre-calculates item sizes, improving scroll performance by avoiding layout
            // recalculations during scrolling.
            getItemLayout={(data, index) => ({
              length: screenWidth,
              // for first image = 300 * 0 = 0pixels ,
              // for second image = 300 * 1 = 300 ,

              offset: screenWidth * index,
              index,
            })} // Optimization for scroll performance
          />
          <View style={styles.dotsContainer}>
            {reduxData &&
              reduxData[0].bannerCarouselBannerCarouselImages.map(
                (_, index) => (
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
                ),
              )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'orange',
  },
  image: {
    width: '100%',
    height: 200,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
    marginHorizontal: 5,
  },
});

export default Carousel;
