import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './Screens/SplashScreen';
import HomeScreen from './Screens/HomeScreen';
import SignUpScreen from './Screens/SignUpScreen';
import LogInScreen from './Screens/LogInScreen';
import HelloCard from './Screens/SplashScreen/HelloCard';
import ReadyCard from './Screens/SplashScreen/ReadyCard';
import {useSelector} from 'react-redux';
import ProtectedRoute from './RouteGuarding/ProtectedRoutes';
import OrderHistoryScreen from './components/ProfileTab/OrderHistoryScreen';
import WishlistScreen from './components/ProfileTab/WishListScreen';
import ProductDetailScreen from './Screens/ProductDetailScreen/ProductDetailScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AboutUsDrawer from './components/AboutUsDrawer';
import WelcomeScreen from './WelcomeScreen';
const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'SplashScreen'}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="SplashHellowCard"
          component={HelloCard}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="SplashReadyCard"
          component={ReadyCard}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="LogInScreen"
          options={{
            headerShown: false,
          }}>
          {() => (
            <ProtectedRoute
              IfLoggedComponent={WelcomeScreen}
              IfNotFallbackComponent={LogInScreen}
            />
          )}
        </Stack.Screen>

        {/* <Stack.Screen
          name="WelcomeScreen"
          options={{
            headerShown: false,
          }}>
          {() => (
            <ProtectedRoute
              IfLoggedComponent={HomeScreen}
              IfNotFallbackComponent={LogInScreen}
            />
          )}
        </Stack.Screen> */}
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen} // Reference the WelcomeScreen directly
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="OrderHistoryScreen"
          options={{
            headerShown: false,
          }}>
          {() => (
            <ProtectedRoute
              IfLoggedComponent={OrderHistoryScreen}
              IfNotFallbackComponent={LogInScreen}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="WishlistScreen"
          options={{
            headerShown: false,
          }}>
          {() => (
            <ProtectedRoute
              IfLoggedComponent={WishlistScreen}
              IfNotFallbackComponent={LogInScreen}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
