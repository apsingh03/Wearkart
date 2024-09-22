// ProtectedRoute.js
import React from 'react';
import {useSelector} from 'react-redux';
import {View, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ProtectedRoute = ({
  IfLoggedComponent: IfLoggedComponent,
  IfNotFallbackComponent: IfNotFallbackComponent,
}) => {
  const isUserLogged = useSelector(state => state.userAuth.loggedData);
  const navigation = useNavigation();
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
