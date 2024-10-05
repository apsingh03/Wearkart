// ProtectedRoute.js
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getUserInfoAsync} from '../Redux/UserSlices/UserAuth';

const ProtectedRoute = ({
  IfLoggedComponent: IfLoggedComponent,
  IfNotFallbackComponent: IfNotFallbackComponent,
}) => {
  const isUserLogged = useSelector(state => state.userAuth.token);
  const dispatch = useDispatch();
  // console.log('Guarding - ', isUserLogged);
  // console.log(
  //   '---> ',
  //   useSelector(state => state.userAuth),
  // );
  const navigation = useNavigation();

  async function fetchData() {
    if (isUserLogged !== null) {
      // console.log(' Calling userInfo ');
      await dispatch(getUserInfoAsync());
    }
  }

  useEffect(() => {
    // console.log('Protected Routes mounting  ');
    fetchData();

    return () => {
      // console.log('Protected Routes UN mounting  ');
    };
  }, [isUserLogged]);

  //   console.log('isUserLogged - ', isUserLogged);

  //   If isUserLogged is undefined (loading state)
  //   if (isUserLogged === undefined) {
  //     return (
  //       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //         <Text> </Text>
  //         <ActivityIndicator size="large" />
  //       </View>
  //     );
  //   }

  // Render the component if the user is authenticated, otherwise the fallback component
  return isUserLogged !== null ? (
    <IfLoggedComponent navigation={navigation} />
  ) : (
    <IfNotFallbackComponent navigation={navigation} />
  );
};

export default ProtectedRoute;
