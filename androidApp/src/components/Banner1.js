import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {windowWidth} from '../Utils/Dimensions';

const Banner1 = () => {
  const {width, height} = Dimensions.get('window');
  const [data, setdata] = useState([1, 1, 1, 1, 1, 1, 1]);
  const [currentIndex, setcurrentIndex] = useState(0);
  // console.log(currentIndex);
  return (
    <>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={{height: height / 2}}>
          <FlatList
            data={data}
            horizontal
            //   when u scroll to next it lets work perfectly
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={e => {
              // get the scroll position
              const scrollPosition = e.nativeEvent.contentOffset.x;
              // console.log( "scroll position - " , scrollPosition )
              // we need to get the index
              const index = (scrollPosition / windowWidth).toFixed(0);
              // console.log('index', index);
              setcurrentIndex(index);
            }}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    width: width - 40,
                    height: height / 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                    backgroundColor: 'red',
                  }}>
                  <TouchableOpacity
                    disabled={true}
                    style={{
                      width: '100%',
                      height: '90%',
                      backgroundColor: 'green',
                      borderRadius: 10,
                    }}></TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          // width: windowWidth,
          justifyContent: 'center',
          // alignItems: 'center',
          // marginTop: 50,
          // backgroundColor: 'orange',
        }}>
        {data.map((_, idx) => {
          return (
            <View
              key={idx}
              style={{
                width: currentIndex == idx ? 30 : 8,
                height: currentIndex == idx ? 10 : 8,
                borderRadius: currentIndex == idx ? 5 : 4,
                backgroundColor: currentIndex == idx ? 'green' : 'gray',
                marginLeft: 5,
              }}></View>
          );
        })}
      </View>
    </>
  );
};

export default Banner1;

const styles = StyleSheet.create({});
