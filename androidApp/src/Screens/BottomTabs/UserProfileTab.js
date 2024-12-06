import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {GLOBALCOLOR} from '../../Utils/globalColor';
import {globalCss} from '../../Utils/CSS';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProfileTabCards from '../../components/ProfileTab/ProfileTabCards';
import CustomButton from '../../components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../Redux/UserSlices/UserAuth';
import LazyLoadingImage from '../../components/LazyLoadingImage';
import CheckInternetUi from '../../components/CheckInternetUi';

const UserProfileTab = () => {
  // const loggedData = useSelector(state => state.userAuth?.userDetails?.query);

  const isUserLogged = useSelector(state => state.userAuth?.token);

  const userDetailsRedux = useSelector(state => state.userAuth?.userDetails);

  const dispatch = useDispatch();
  return (
    <>
      <CheckInternetUi />
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

          <View
            style={[globalCss.flexColumn, {gap: 5, alignItems: 'flex-start'}]}>
            <Text
              style={{
                fontSize: 18,
                color: GLOBALCOLOR.black2,

                fontFamily: 'Raleway-ExtraBold',
              }}>
              {(userDetailsRedux?.query && userDetailsRedux?.query[0]?.email) ||
                'Please Login'}
            </Text>

            <Text
              style={{
                fontSize: 18,
                color: GLOBALCOLOR.black2,

                fontFamily: 'Raleway-ExtraBold',
              }}>
              {(userDetailsRedux?.query &&
                userDetailsRedux?.query[0]?.fullName) ||
                'To get User Details'}
            </Text>
          </View>
        </View>

        <View>
          <ProfileTabCards
            title={'Order History'}
            routeLink="OrderHistoryScreen"
          />
          <ProfileTabCards title={'Wish List'} routeLink={'WishlistScreen'} />

          <ProfileTabCards
            title={'Sign Up Screen'}
            routeLink={'SignUpScreen'}
          />

          <ProfileTabCards title={'Sign In Screen'} routeLink={'LogInScreen'} />

          <ProfileTabCards title={'Splash Screen'} routeLink={'SplashScreen'} />

          {isUserLogged !== null && (
            <View
              style={{
                marginTop: 50,
              }}>
              <TouchableOpacity
                onPress={() => dispatch(logout())}
                style={{
                  width: '100%',
                  backgroundColor: 'blue',
                  padding: 10,
                  elevation: 50,
                }}
                activeOpacity={0.8}>
                <Text
                  style={{textAlign: 'center', fontSize: 18, color: '#fff'}}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default UserProfileTab;

const styles = StyleSheet.create({});
