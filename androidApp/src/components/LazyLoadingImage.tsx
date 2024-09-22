import {StyleSheet, View, Image, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';

type LazyLoadingImageProps = {
  uri?: string;
  source?: number | {uri: string};
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  height?: number;
  width?: number;
  props?: string;
};

// const LazyLoadingImage = ({uri, source, resizeMode, height, width}) => {

const LazyLoadingImage: React.FC<LazyLoadingImageProps> = ({
  uri,
  source,
  resizeMode,
  height,
  width,
  ...props
}) => {
  const [loading, setLoading] = useState(true);

  // Validate props
  if (!uri && !source) {
    // console.error('Either `uri` or `source` must be provided');
    return null;
  }

  return (
    <View style={[styles.imageContainer, {height, width}]}>
      {loading && (
        <View style={[styles.placeholder, {height, width}]}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      )}
      <Image
        source={uri ? {uri} : source} // Choose between URI or local source
        style={[styles.image, {height: '100%', width: '100%'}]} // Full width/height of the container
        resizeMode={resizeMode}
        onLoadEnd={() => setLoading(false)} // Set loading to false once image is loaded
        {...props}
        alt="its a image"
      />
    </View>
  );
};

export default LazyLoadingImage;

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    // Removed static height and width for dynamic handling
  },
  placeholder: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f0f0f0', // Placeholder background color
  },
});
