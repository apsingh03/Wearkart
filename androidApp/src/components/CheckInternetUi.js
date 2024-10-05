import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import NetInfo from '@react-native-community/netinfo';

const CheckInternetUi = () => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });

    // Clean up the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {isOffline && (
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>No internet connection</Text>
        </View>
      )}
    </>
  );
};

export default CheckInternetUi;

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: 'black',
    padding: 5,
  },
  offlineText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 10,
  },
});
