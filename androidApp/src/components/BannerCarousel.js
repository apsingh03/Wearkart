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

const images = [
  'https://cdn.pixabay.com/photo/2015/08/23/09/22/banner-902589_640.jpg',
  'https://plus.unsplash.com/premium_photo-1683121269108-1bd195cd18cf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1530231810657-c657c81a437d?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  // Auto-scroll logic using setInterval
  useEffect(() => {
    //   const interval = setInterval(() => {
    //     const nextIndex = (activeIndex + 1) % images.length;
    //     flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
    //     setActiveIndex(nextIndex);
    //   }, 3000); // 3 seconds interval
    //   return () => clearInterval(interval); // Cleanup on component unmount
  }, [activeIndex]);

  // Update active index when scroll ends
  const onViewableItemsChanged = useRef(({viewableItems}) => {
    console.log('viewableItems - ', viewableItems);
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  // Scroll to the selected dot
  const dotsScrollToIndex = index => {
    flatListRef.current?.scrollToIndex({index, animated: true});
    setActiveIndex(index);
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        renderItem={({item}) => {
          return (
            <View style={styles.carouselItem}>
              <Image
                source={{uri: item}}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
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
        initialNumToRender={1} //  Only renders the first item initially to save memory.
        // Limits how many items are rendered at once to reduce memory consumption.
        maxToRenderPerBatch={2}
        // Sets the window size to pre-render a few items around the current one to keep
        // the scroll smooth without rendering too many items.
        windowSize={2}
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
        {images.map((_, index) => (
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
    width: screenWidth,
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
