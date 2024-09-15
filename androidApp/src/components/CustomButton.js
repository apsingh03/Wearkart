// src/components/CustomButton.js

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
  View,
} from 'react-native';

const CustomButton = ({
  title,
  onPress,
  width,
  height,
  backgroundColor,
  textColor,
  fontFamily,
  fontSize,
  titleWeight,
  indicatorIsLoading,
  indicatorColor,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles.button,
        {
          width: width || 'auto', // Default full width if not provided
          height: height || 'auto', // Default height if not provided
          backgroundColor: backgroundColor || '#007BFF', // Default bg color if not provided
        },
      ]}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          // justifyContent: 'center',
        }}>
        <Text
          style={[
            styles.text,
            {
              color: textColor,
              fontFamily: fontFamily,
              fontSize: fontSize,
              fontWeight: titleWeight,
            },
          ]}>
          {title}
        </Text>

        {indicatorIsLoading && (
          <View style={{marginLeft: 10}}>
            <ActivityIndicator size="small" color={indicatorColor || 'black'} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8, // Rounded corners, you can change as needed
    paddingHorizontal: 16,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default CustomButton;
