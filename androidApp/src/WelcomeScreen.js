import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeScreen from './Screens/HomeScreen';
import SideBar from './Screens/DrawerScreen/SideBar';
import ProtectedRoute from './RouteGuarding/ProtectedRoutes';
import LogInScreen from './Screens/LogInScreen';

const Drawer = createDrawerNavigator();

const WelcomeScreen = () => {
  return (
    <>
      <Drawer.Navigator drawerContent={props => <SideBar {...props} />}>
        <Drawer.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </Drawer.Navigator>
    </>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
