import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// Bottom Tabs imports
import HomeTab from './BottomTabs/HomeTab';
import UserProfileTab from './BottomTabs/UserProfileTab';
import ProductsExploreTab from './BottomTabs/ProductsExploreTab';
import CartTab from './BottomTabs/CartTab';

// icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BottomTab = createBottomTabNavigator();
const HomeScreen = () => {
  return (
    <>
      <BottomTab.Navigator initialRouteName="HomeTab">
        <BottomTab.Screen
          name="HomeTab"
          component={HomeTab}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarInactiveBackgroundColor: '#fff',
            tabBarActiveBackgroundColor: '#fff',
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#004CFF',
            tabBarLabelStyle: {fontSize: 14},
            tabBarStyle: {backgroundColor: 'white'},
            tabBarBadgeStyle: {backgroundColor: 'red'},
            // tabBarBadge: 100,

            tabBarIcon: ({color, size}) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <BottomTab.Screen
          name="ProductsExploreTab"
          component={ProductsExploreTab}
          options={{
            headerShown: false,
            tabBarLabel: 'Explore',
            tabBarInactiveBackgroundColor: '#fff',
            tabBarActiveBackgroundColor: '#fff',
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#004CFF',
            tabBarLabelStyle: {fontSize: 14},
            tabBarStyle: {backgroundColor: 'white'},
            tabBarBadgeStyle: {backgroundColor: 'red'},
            // tabBarBadge: 100,

            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="explore" size={size} color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="CartTab"
          component={CartTab}
          options={{
            headerShown: false,
            tabBarLabel: 'Cart',
            tabBarInactiveBackgroundColor: '#fff',
            tabBarActiveBackgroundColor: '#fff',
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#004CFF',
            tabBarLabelStyle: {fontSize: 14},
            tabBarStyle: {backgroundColor: 'white'},
            tabBarBadgeStyle: {backgroundColor: 'red'},
            // tabBarBadge: 100,

            tabBarIcon: ({color, size}) => (
              <Entypo name="shopping-cart" size={size} color={color} />
            ),
          }}
        />

        <BottomTab.Screen
          name="UserProfileTab"
          component={UserProfileTab}
          options={{
            headerShown: false,
            tabBarLabel: 'Profile',
            tabBarInactiveBackgroundColor: '#fff',
            tabBarActiveBackgroundColor: '#fff',
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#004CFF',

            tabBarBadgeStyle: {backgroundColor: 'red'},
            // tabBarBadge: 100,

            tabBarStyle: {
              backgroundColor: '#fff',
              // padding: 10, // Example padding
              // marginBottom: 10, // Example margin
            },
            tabBarLabelStyle: {
              fontSize: 14,
              // padding: 5, // Example padding for label
            },
            tabBarIconStyle: {
              // padding: 5, // Example padding for icon
            },

            tabBarIcon: ({color, size}) => (
              <FontAwesome name="user-circle" size={size} color={color} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
});
