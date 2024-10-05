import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {clientDebouncedSearchAsync} from '../Redux/ClientSlices/clientDebounceSearchSlice';

import {useNavigation} from '@react-navigation/native'; // for navigation in React Native
import Icon from 'react-native-vector-icons/Ionicons'; // use this instead of react-icons

const DebounceSearch = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); // handle navigation
  const client_debounceSearch = useSelector(
    state => state.client_debounceSearch.data,
  );

  //   console.log('client_debounceSearch  - ', client_debounceSearch);

  const [searchQuery, setSearchQuery] = useState('');

  const [isLoadingDebounceSearch, setisLoadingDebounceSearch] = useState(false);
  const [isActiveDebounceChildContainer, setisActiveDebounceChildContainer] =
    useState(false);

  const fetchData = async () => {
    setisLoadingDebounceSearch(true);
    await dispatch(clientDebouncedSearchAsync({inputQuery: searchQuery}));
    setisLoadingDebounceSearch(false);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length > 1) {
        fetchData();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#000" />
        <TextInput
          style={styles.input}
          placeholder="Search Products"
          autoComplete="off"
          //   onFocus={() => setisActiveDebounceChildContainer(true)}
          onPress={() => setisActiveDebounceChildContainer(true)}
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        {isLoadingDebounceSearch && (
          <ActivityIndicator size="small" color="#000" />
        )}
      </View>

      {isActiveDebounceChildContainer && (
        <View style={styles.resultContainer}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTitle}>Your Searches</Text>
            <TouchableOpacity
              onPress={() => [
                setSearchQuery(''),
                setisActiveDebounceChildContainer(false),
              ]}>
              <Icon name="close" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.resultList}
            showsVerticalScrollIndicator={false}>
            {client_debounceSearch.query &&
            client_debounceSearch?.query?.length > 0 ? (
              client_debounceSearch?.query.map((data, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.resultItem}
                  onPress={() => {
                    navigation.navigate('ProductDetailScreen', {
                      productId: data?.id,
                    });
                    setisActiveDebounceChildContainer(false);
                  }}>
                  <Icon name="search" size={16} color="#000" />
                  <Text
                    style={styles.resultText}>{`${data.id} ${data.name}`}</Text>
                  <Icon name="arrow-forward" size={16} color="#000" />
                </TouchableOpacity>
              ))
            ) : !isLoadingDebounceSearch ? (
              <Text style={styles.noResultText}>Sorry, no results found.</Text>
            ) : null}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    position: 'relative',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 5,
    fontSize: 16,
    // color: '#0000',
  },
  resultContainer: {
    marginTop: 10,
    position: 'absolute',
    backgroundColor: '#fff',
    top: 50,
    left: 10,
    zIndex: 1,
    width: '100%',
    padding: 10,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 5,
    marginBottom: 10,
  },
  resultTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Nunito-Regular',
    color: '#202020',
  },
  resultList: {
    maxHeight: 300,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  resultText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
  },
  noResultText: {
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Nunito-ExtraBold',
  },
});

export default DebounceSearch;
