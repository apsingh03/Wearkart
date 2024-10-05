import {useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';

const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true); // Assuming the app starts online

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // Cleanup the subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return isConnected;
};

export default useNetworkStatus;
