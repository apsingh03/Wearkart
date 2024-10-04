import {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
// import { SubText } from './SubText';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {Button} from 'react-native-paper';

// import {RadioButton} from 'react-native-paper';
import {windowHeight, windowWidth} from '../../Utils/Dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {
  clientGetProductFiltersAsync,
  clientGetSizesFiltersAsync,
} from '../../Redux/ClientSlices/clientProductSlice';
import {globalCss} from '../../Utils/CSS';
import {GLOBALCOLOR} from '../../Utils/globalColor';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CheckBox from '@react-native-community/checkbox';
import FilterCategory from './FilterCategory';
import FilterSubCategory from './FilterSubCategory';
import {useProductsFilterFunctions} from '../../customHooks/ProductFilterCustomHook';
import Entypo from 'react-native-vector-icons/Entypo';

const BottomPopUp = ({isBottomSheetOpen, setIsBottomSheetOpen}) => {
  const {handleCheckboxChange, selectedFilters} = useProductsFilterFunctions();

  const dispatch = useDispatch();

  const client_productFiltersRedux = useSelector(
    state => state.client_product?.productFilters,
  );

  const client_sizesFiltersRedux = useSelector(
    state => state.client_product?.sizesFilters,
  );

  const [isFilterChildRadiosVisible, setIsFilterChildRadiosVisible] = useState(
    {},
  );

  const handleFilterToggle = id => {
    setIsFilterChildRadiosVisible(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  async function fetchData() {
    await dispatch(clientGetProductFiltersAsync());
    await dispatch(clientGetSizesFiltersAsync());
  }

  const handleCategoryToggle = (filterType, subCatName) => {
    const isChecked = selectedFilters[filterType].includes(subCatName);

    handleCheckboxChange(filterType, subCatName, !isChecked);
    // console.log('filterType - ', filterType, subCatName, isChecked);
  };

  useEffect(() => {
    // console.log('Mounting Bottom ');
    fetchData();
  }, []);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isBottomSheetOpen}
        onRequestClose={() => setIsBottomSheetOpen(false)}>
        <View style={[styles.bottomSheet, {height: windowHeight * 0.6}]}>
          {/* Header */}
          <View
            style={{
              flex: 0,
              width: '100%',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 15,
                color: 'black',
                fontWeight: 600,

                fontFamily: 'Nunito-ExtraBold',
              }}>
              Apply Product Filters
            </Text>

            <TouchableOpacity onPress={() => setIsBottomSheetOpen(false)}>
              <Ionicons name="close" size={30} color="black" />
            </TouchableOpacity>
          </View>

          <View style={{marginVertical: 10}}>
            {Object.entries(selectedFilters).map(
              ([filterType, filterValues], index) => (
                <View
                  style={[
                    globalCss.flexRow,
                    {marginBottom: 0, flexWrap: 'wrap'},
                  ]}
                  key={index}>
                  {filterValues.length > 0 && (
                    <>
                      {/* <Text style={styles.selectedFilterTitle}>
                        {filterType.charAt(0).toUpperCase() +
                          filterType.slice(1)}
                        -
                      </Text> */}
                      {filterValues.map((data, idx) => (
                        <View
                          style={[
                            [
                              globalCss.rowBetweenCenter,
                              styles.selectedFilterChildTitleBox,
                              ,
                              {marginBottom: 10},
                            ],
                          ]}
                          key={idx}>
                          <Text style={styles.selectedFilterTitle}>{data}</Text>
                          <TouchableOpacity
                            onPress={() =>
                              handleCategoryToggle(filterType, data)
                            }>
                            <Entypo size={20} color={'#000'} name="cross" />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </>
                  )}
                </View>
              ),
            )}
          </View>

          <FlatList
            data={[{key: 'filters'}, {key: 'sizes'}]} // Define sections
            keyExtractor={item => item.key}
            renderItem={({item}) => {
              if (item.key === 'filters') {
                return (
                  <FlatList
                    data={client_productFiltersRedux?.query || []}
                    keyExtractor={categoryItem => categoryItem.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item: categoryItem}) => (
                      <>
                        <FilterCategory
                          isFilterChildRadiosVisible={
                            isFilterChildRadiosVisible
                          }
                          categoryItem={categoryItem}
                          handleFilterToggle={handleFilterToggle}
                        />
                        {isFilterChildRadiosVisible[categoryItem?.id] ? (
                          <FilterSubCategory
                            isFilterChildRadiosVisible={
                              isFilterChildRadiosVisible
                            }
                            subCategoryData={categoryItem?.filterChildData}
                            filterType={categoryItem?.name.toLowerCase()}
                            handleCategoryToggle={handleCategoryToggle}
                            selectedFilters={selectedFilters}
                          />
                        ) : null}
                      </>
                    )}
                  />
                );
              } else if (item.key === 'sizes') {
                return (
                  <View>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => handleFilterToggle('Sizes')}
                      style={[globalCss.rowBetweenCenter, {marginBottom: 10}]}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: GLOBALCOLOR.black2,
                          fontFamily: 'Nunito-ExtraBold',
                        }}>
                        Sizes
                      </Text>

                      <View>
                        {isFilterChildRadiosVisible['Sizes'] ? (
                          <MaterialIcons
                            name="keyboard-arrow-up"
                            color={'#000'}
                            size={30}
                          />
                        ) : (
                          <MaterialIcons
                            name="keyboard-arrow-down"
                            color={'#000'}
                            size={30}
                          />
                        )}
                      </View>
                    </TouchableOpacity>

                    {isFilterChildRadiosVisible['Sizes'] ? (
                      <View
                        style={{
                          marginTop: 0,
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap', // Automatically wraps items based on width
                        }}>
                        {client_sizesFiltersRedux.query &&
                          client_sizesFiltersRedux.query.map(
                            (childSizes, index) => (
                              <TouchableOpacity
                                onPress={() =>
                                  handleCategoryToggle('size', childSizes?.name)
                                }
                                key={index}
                                style={{
                                  borderWidth: 1,
                                  borderColor: '#000',
                                  padding: 10,
                                  height: 'auto',
                                  width: 'auto', // Fixed width for each card
                                  backgroundColor: selectedFilters[
                                    'size'
                                  ]?.includes(childSizes?.name)
                                    ? '#131212'
                                    : '#f0f0f0',
                                  margin: 5,
                                  borderRadius: 5,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: selectedFilters['size']?.includes(
                                      childSizes?.name,
                                    )
                                      ? '#fff'
                                      : '#000',
                                    fontFamily: 'Nunito-Bold',
                                  }}>
                                  {childSizes?.name}
                                </Text>
                              </TouchableOpacity>
                            ),
                          )}
                      </View>
                    ) : null}
                  </View>
                );
              }
            }}
          />
        </View>
      </Modal>
    </>
  );
};

export default BottomPopUp;

// The StyleSheet is imported from React Native
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    bottom: 0,
    borderWidth: 1,
    borderColor: 'black',
  },

  selectedFilterTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: GLOBALCOLOR.black2,
  },

  selectedFilterChildTitleBox: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 3,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
